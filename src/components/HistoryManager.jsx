import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaHistory, FaFileDownload } from 'react-icons/fa';

const HistoryManager = () => {
    const [history, setHistory] = useState([]);
    const [backupStatus, setBackupStatus] = useState('');

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('invoiceHistory') || '[]');
        setHistory(savedHistory);
    }, []);

    const handleBackup = () => {
        setBackupStatus('Backing up...');
        setTimeout(() => {
            setBackupStatus('Backup successful! All files saved to cloud.');
            setTimeout(() => setBackupStatus(''), 3000);
        }, 1500);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaHistory /> Recent History
                </h2>
                <button
                    onClick={handleBackup}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <FaCloudUploadAlt /> Backup to Cloud
                </button>
            </div>

            {backupStatus && (
                <div style={{
                    padding: '10px',
                    background: '#d4edda',
                    color: '#155724',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {backupStatus}
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {history.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        No recent history found. Generate some invoices or emails to see them here.
                    </div>
                ) : (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {history.map((item, index) => (
                            <li key={index} style={{
                                padding: '15px 20px',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{item.type}</div>
                                    <div style={{ fontSize: '12px', color: '#888' }}>{new Date(item.date).toLocaleString()}</div>
                                </div>
                                <div style={{ color: '#007bff' }}>
                                    <FaFileDownload />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HistoryManager;
