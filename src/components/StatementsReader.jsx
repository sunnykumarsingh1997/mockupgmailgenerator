import React, { useState, useEffect, useRef } from 'react';
import { GeminiService } from '../services/GeminiService';
import { supabase } from '../supabaseClient';
import { getStoredPasswords, savePassword, isPasswordProtected } from '../services/PDFService';
import './StatementsReader.css';

const StatementsReader = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [newClientName, setNewClientName] = useState('');
    const [showNewClientInput, setShowNewClientInput] = useState(false);
    const [password, setPassword] = useState('');
    const [storedPasswords, setStoredPasswords] = useState([]);
    const [passwordPromptVisible, setPasswordPromptVisible] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [processingStatus, setProcessingStatus] = useState({});
    const [savedStatements, setSavedStatements] = useState([]);
    const passwordPromptResolver = useRef(null);

    // Load clients and stored passwords on mount
    useEffect(() => {
        loadClients();
        loadStoredPasswords();
    }, []);

    const loadClients = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('user_id', user.id)
                .order('name', { ascending: true });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Error loading clients:', error);
        }
    };

    const loadStoredPasswords = () => {
        const passwords = getStoredPasswords();
        setStoredPasswords(passwords);
        if (passwords.length > 0) {
            setPassword(passwords[0]); // Auto-fill with most recent password
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const createClient = async () => {
        if (!newClientName.trim()) return;

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('clients')
                .insert([{ user_id: user.id, name: newClientName.trim() }])
                .select()
                .single();

            if (error) throw error;

            setClients(prev => [...prev, data]);
            setSelectedClientId(data.id.toString());
            setNewClientName('');
            setShowNewClientInput(false);
        } catch (error) {
            console.error('Error creating client:', error);
            alert('Failed to create client. It may already exist.');
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select at least one PDF file');
            return;
        }

        if (!selectedClientId && !showNewClientInput) {
            alert('Please select or create a client');
            return;
        }

        if (showNewClientInput && !newClientName.trim()) {
            alert('Please enter a client name');
            return;
        }

        // Create client if needed
        let clientId = selectedClientId;
        if (showNewClientInput) {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please log in to continue');
                setLoading(false);
                return;
            }

            // Create client
            const { data: newClient, error: clientError } = await supabase
                .from('clients')
                .insert([{ user_id: user.id, name: newClientName.trim() }])
                .select()
                .single();

            if (clientError) {
                alert('Failed to create client. It may already exist.');
                setLoading(false);
                return;
            }

            setClients(prev => [...prev, newClient]);
            clientId = newClient.id.toString();
            setSelectedClientId(clientId);
            setShowNewClientInput(false);
        }

        if (!clientId) {
            alert('Please select or create a client');
            return;
        }

        setLoading(true);
        const status = {};

        try {
            // Process each file
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                status[file.name] = 'processing';
                setProcessingStatus({ ...status });

                try {
                    // Check if password protected
                    const isProtected = await isPasswordProtected(file);
                    let filePassword = password;

                    if (isProtected && !filePassword) {
                        // Show password prompt for this file
                        setCurrentFileIndex(i);
                        setPasswordPromptVisible(true);
                        // Wait for password input
                        filePassword = await new Promise((resolve) => {
                            passwordPromptResolver.current = resolve;
                        });
                        setPasswordPromptVisible(false);
                    }

                    // Save password if provided
                    if (filePassword) {
                        savePassword(filePassword);
                        loadStoredPasswords();
                    }

                    // Parse statement
                    const result = await GeminiService.parseStatement(file, filePassword);
                    
                    // Extract month and year from statement or use defaults
                    const statementMonth = result.statementMonth || new Date().getMonth() + 1;
                    const statementYear = result.statementYear || new Date().getFullYear();

                    // Save to database
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) {
                        throw new Error('User not authenticated');
                    }

                    // Check if statement already exists for this month/year
                    const { data: existing, error: checkError } = await supabase
                        .from('statements')
                        .select('id')
                        .eq('user_id', user.id)
                        .eq('client_id', clientId)
                        .eq('statement_month', statementMonth)
                        .eq('statement_year', statementYear)
                        .maybeSingle();

                    if (checkError && checkError.code !== 'PGRST116') {
                        console.error('Error checking existing statement:', checkError);
                        throw checkError;
                    }

                    if (existing) {
                        // Update existing statement
                        const { error: updateError } = await supabase
                            .from('statements')
                            .update({
                                file_name: file.name,
                                transactions: result.transactions,
                                summary: result.summary
                            })
                            .eq('id', existing.id);

                        if (updateError) {
                            console.error('Error updating statement:', updateError);
                            throw updateError;
                        }
                    } else {
                        // Insert new statement
                        const { error: insertError } = await supabase
                            .from('statements')
                            .insert([{
                                user_id: user.id,
                                client_id: parseInt(clientId),
                                file_name: file.name,
                                transactions: result.transactions,
                                summary: result.summary,
                                statement_month: statementMonth,
                                statement_year: statementYear
                            }]);

                        if (insertError) {
                            console.error('Error inserting statement:', insertError);
                            throw insertError;
                        }
                    }

                    status[file.name] = 'success';
                    setProcessingStatus({ ...status });

                    // Update transactions and summary with latest file's data
                    if (i === files.length - 1) {
                        setTransactions(result.transactions);
                        setSummary(result.summary);
                    }
                } catch (error) {
                    console.error(`Error processing ${file.name}:`, error);
                    status[file.name] = 'error';
                    setProcessingStatus({ ...status });
                    // Show error message to user
                    alert(`Error processing ${file.name}: ${error.message || 'Unknown error'}`);
                }
            }

            // Count successful saves
            const successCount = Object.values(status).filter(s => s === 'success').length;
            const errorCount = Object.values(status).filter(s => s === 'error').length;
            
            // Reload saved statements (show all, not just for this client)
            await loadSavedStatements(null);
            
            // Clear files after processing
            setFiles([]);
            
            if (errorCount === 0) {
                alert(`All ${successCount} statement(s) processed and saved successfully!`);
            } else {
                alert(`${successCount} statement(s) saved successfully. ${errorCount} statement(s) failed. Check the processing status for details.`);
            }
        } catch (error) {
            console.error('Error processing statements:', error);
            alert('Failed to process statements. Please try again.');
        } finally {
            setLoading(false);
            setPasswordPromptVisible(false);
        }
    };

    const loadSavedStatements = async (clientId = null) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            let query = supabase
                .from('statements')
                .select(`
                    *,
                    clients(name)
                `)
                .eq('user_id', user.id);

            // If clientId is provided, filter by client, otherwise show all
            if (clientId) {
                query = query.eq('client_id', clientId);
            }

            const { data, error } = await query
                .order('statement_year', { ascending: false })
                .order('statement_month', { ascending: false })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSavedStatements(data || []);
        } catch (error) {
            console.error('Error loading saved statements:', error);
            // Try loading without join if join fails
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                let query = supabase
                    .from('statements')
                    .select('*')
                    .eq('user_id', user.id);

                if (clientId) {
                    query = query.eq('client_id', clientId);
                }

                const { data, error } = await query
                    .order('statement_year', { ascending: false })
                    .order('statement_month', { ascending: false });

                if (!error) {
                    setSavedStatements(data || []);
                }
            } catch (e) {
                console.error('Error loading statements (fallback):', e);
            }
        }
    };

    useEffect(() => {
        // Load all statements on mount and when client changes
        loadSavedStatements(selectedClientId || null);
    }, [selectedClientId]);

    const formatCurrency = (amount) => {
        return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const handleTransactionChange = (id, field, value) => {
        setTransactions(prev => prev.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        ));
    };

    const exportToCSV = () => {
        if (transactions.length === 0) return;

        const headers = ["Date", "Merchant", "Amount (INR)", "Category", "Notes"];
        const csvContent = [
            headers.join(","),
            ...transactions.map(t =>
                [t.date, t.merchant, t.amount, t.category, t.notes].join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "transactions.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getMonthName = (month) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month - 1] || '';
    };

    return (
        <div className="statements-reader-container">
            <div className="hero-section">
                <h1>AI Statements Reader</h1>
                <p>Upload your credit card statements (PDF) to automatically extract and categorize transactions.</p>
            </div>

            {/* Client Selection Section */}
            <div className="client-section">
                <h3>Select Client</h3>
                <div className="client-selector">
                    <select
                        value={selectedClientId}
                        onChange={(e) => {
                            setSelectedClientId(e.target.value);
                            setShowNewClientInput(false);
                        }}
                        className="client-select"
                    >
                        <option value="">-- Select Client --</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            setShowNewClientInput(true);
                            setSelectedClientId('');
                        }}
                        className="new-client-button"
                    >
                        + New Client
                    </button>
                </div>
                {showNewClientInput && (
                    <div className="new-client-input">
                        <input
                            type="text"
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value)}
                            placeholder="Enter client name"
                            className="client-name-input"
                        />
                        <button onClick={createClient} className="create-client-button">
                            Create
                        </button>
                        <button onClick={() => setShowNewClientInput(false)} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Password Section */}
            <div className="password-section">
                <h3>PDF Password (if protected)</h3>
                <div className="password-input-group">
                    <select
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-select"
                    >
                        <option value="">-- Select saved password --</option>
                        {storedPasswords.map((pwd, idx) => (
                            <option key={idx} value={pwd}>{pwd}</option>
                        ))}
                    </select>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Or enter new password"
                        className="password-input"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && password) {
                                savePassword(password);
                                loadStoredPasswords();
                            }
                        }}
                    />
                </div>
                {storedPasswords.length > 0 && (
                    <p className="password-hint">Recent passwords are saved and can be reused instantly</p>
                )}
            </div>

            {/* File Upload Section */}
            <div className="upload-section">
                <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                />
                {files.length > 0 && (
                    <div className="files-list">
                        <h4>Selected Files ({files.length}):</h4>
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name}</span>
                                <button onClick={() => removeFile(index)} className="remove-file-button">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || loading}
                    className="upload-button"
                >
                    {loading ? "Processing..." : `Analyze ${files.length > 1 ? `${files.length} Statements` : 'Statement'}`}
                </button>
            </div>

            {/* Processing Status */}
            {Object.keys(processingStatus).length > 0 && (
                <div className="processing-status">
                    <h4>Processing Status:</h4>
                    {Object.entries(processingStatus).map(([fileName, status]) => (
                        <div key={fileName} className={`status-item status-${status}`}>
                            <span>{fileName}</span>
                            <span className="status-badge">
                                {status === 'processing' && '⏳ Processing...'}
                                {status === 'success' && '✓ Success'}
                                {status === 'error' && '✗ Error'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Password Prompt Modal */}
            {passwordPromptVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Password Required</h3>
                        <p>PDF "{files[currentFileIndex]?.name}" is password protected. Please enter the password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && password) {
                                    if (password) {
                                        savePassword(password);
                                        loadStoredPasswords();
                                    }
                                    if (passwordPromptResolver.current) {
                                        passwordPromptResolver.current(password);
                                        passwordPromptResolver.current = null;
                                    }
                                    setPasswordPromptVisible(false);
                                }
                            }}
                            placeholder="Enter PDF password"
                            className="password-input"
                            autoFocus
                        />
                        <div className="modal-buttons">
                            <button
                                onClick={() => {
                                    if (password) {
                                        savePassword(password);
                                        loadStoredPasswords();
                                    }
                                    if (passwordPromptResolver.current) {
                                        passwordPromptResolver.current(password || '');
                                        passwordPromptResolver.current = null;
                                    }
                                    setPasswordPromptVisible(false);
                                }}
                                className="modal-button"
                            >
                                Continue
                            </button>
                            <button
                                onClick={() => {
                                    if (passwordPromptResolver.current) {
                                        passwordPromptResolver.current('');
                                        passwordPromptResolver.current = null;
                                    }
                                    setPasswordPromptVisible(false);
                                }}
                                className="modal-button cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="loading-indicator">
                    <div className="spinner"></div>
                    <p>AI is analyzing your statements...</p>
                </div>
            )}

            {summary && (
                <div className="summary-section">
                    <div className="summary-card">
                        <h3>Total Spend</h3>
                        <p className="amount">{formatCurrency(summary.totalSpend)}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Top Category</h3>
                        <p>{summary.topCategory}</p>
                    </div>
                </div>
            )}

            {/* Saved Statements List - Always show at bottom if there are any */}
            {savedStatements.length > 0 && (
                <div className="saved-statements-section">
                    <div className="statements-header">
                        <h3>Saved Statements ({savedStatements.length})</h3>
                        <button 
                            onClick={() => loadSavedStatements(null)} 
                            className="refresh-button"
                            title="Refresh list"
                        >
                            🔄 Refresh
                        </button>
                    </div>
                    <div className="statements-list">
                        {savedStatements.map((stmt) => {
                            const clientName = stmt.clients?.name || clients.find(c => c.id === stmt.client_id)?.name || 'Unknown Client';
                            return (
                                <div key={stmt.id} className="statement-item">
                                    <div className="statement-info">
                                        <strong>{stmt.file_name}</strong>
                                        <div className="statement-meta">
                                            <span className="statement-client">Client: {clientName}</span>
                                            <span className="statement-date">
                                                {getMonthName(stmt.statement_month)} {stmt.statement_year}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="statement-details">
                                        {stmt.summary && (
                                            <div className="statement-summary">
                                                <div>Total: {formatCurrency(stmt.summary.totalSpend || 0)}</div>
                                                {stmt.summary.transactionCount && (
                                                    <div className="transaction-count">
                                                        {stmt.summary.transactionCount} transactions
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => {
                                                setTransactions(stmt.transactions || []);
                                                setSummary(stmt.summary || null);
                                                // Scroll to transactions section
                                                setTimeout(() => {
                                                    document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
                                            }}
                                            className="view-statement-button"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {transactions.length > 0 && (
                <div className="results-section">
                    <div className="actions-bar">
                        <h2>Transactions</h2>
                        <button onClick={exportToCSV} className="export-button">Export to CSV</button>
                    </div>

                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Merchant</th>
                                <th>Amount (INR)</th>
                                <th>Category</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <input
                                            value={t.date}
                                            onChange={(e) => handleTransactionChange(t.id, 'date', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={t.merchant}
                                            onChange={(e) => handleTransactionChange(t.id, 'merchant', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={t.amount}
                                            onChange={(e) => handleTransactionChange(t.id, 'amount', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={t.category}
                                            onChange={(e) => handleTransactionChange(t.id, 'category', e.target.value)}
                                        >
                                            <option value="Travel">Travel</option>
                                            <option value="Office">Office</option>
                                            <option value="Meals">Meals</option>
                                            <option value="Software">Software</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            value={t.notes}
                                            onChange={(e) => handleTransactionChange(t.id, 'notes', e.target.value)}
                                            placeholder="Add notes..."
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StatementsReader;
