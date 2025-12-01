// Mock Gemini Service
// In a real app, this would call the Google Gemini API
import { extractTextFromPDF } from './PDFTextExtractor';

export const GeminiService = {
    generateContent: async (type, prompt, messageCount = 3) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const keywords = prompt.toLowerCase();

        // Context-aware generation logic
        if (type === 'email_body') {
            if (keywords.includes('refund')) {
                return `Dear Customer Support,\n\nI am writing to request a refund for my recent order. The item I received was damaged and not as described. I have attached photos for your reference.\n\nPlease process this refund immediately.\n\nSincerely,\n[Your Name]`;
            } else if (keywords.includes('angry')) {
                return `To Whom It May Concern,\n\nI am extremely disappointed with your service. This is unacceptable behavior and I demand an immediate explanation and resolution.\n\nFix this now.\n\n[Your Name]`;
            } else if (keywords.includes('happy') || keywords.includes('thanks')) {
                return `Hi Team,\n\nI just wanted to say thank you for the amazing service! I really appreciate your help and quick response.\n\nBest regards,\n[Your Name]`;
            } else {
                return `Hi,\n\nI am writing to inquire about [Topic]. Could you please provide more information regarding this matter?\n\nThank you,\n[Your Name]`;
            }
        }

        if (type === 'subject') {
            if (keywords.includes('refund')) return "Urgent: Refund Request - Order #12345";
            if (keywords.includes('angry')) return "Complaint regarding poor service";
            if (keywords.includes('happy')) return "Thank you for your great service!";
            return "Inquiry regarding your services";
        }

        if (type === 'name') {
            const names = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "David Wilson"];
            return names[Math.floor(Math.random() * names.length)];
        }

        if (type === 'email') {
            const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
            const user = Math.random().toString(36).substring(7);
            return `${user}@${domains[Math.floor(Math.random() * domains.length)]}`;
        }

        if (type === 'card') {
            return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
        }

        if (type === 'merchant') {
            const merchants = ["Amazon", "Flipkart", "Uber", "Zomato", "Netflix", "Apple", "Google"];
            return merchants[Math.floor(Math.random() * merchants.length)];
        }

        if (type === 'amount') {
            return (Math.random() * 10000).toFixed(2);
        }

        if (type === 'date') {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            return date.toLocaleDateString('en-GB');
        }

        if (type === 'email_thread') {
            const messages = [];
            const senders = ["John Doe", "Support Team", "Jane Smith"];
            const time = ["10:00 AM", "10:15 AM", "10:30 AM", "11:00 AM"];

            for (let i = 0; i < messageCount; i++) {
                messages.push({
                    id: Date.now() + i,
                    sender: senders[i % senders.length],
                    senderEmail: `user${i}@example.com`,
                    receiver: "Me",
                    receiverEmail: "me@example.com",
                    time: time[i % time.length],
                    body: `This is message #${i + 1} regarding ${prompt}. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
                    isMe: i % 2 !== 0,
                });
            }
            return JSON.stringify(messages);
        }

        if (type.startsWith('invoice_')) {
            return JSON.stringify({
                amount1: (Math.random() * 500).toFixed(2),
                currency: "$",
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                card: "Visa - " + Math.floor(1000 + Math.random() * 9000),
                name: "John Doe",
                email: "john.doe@example.com",
                address: "123 Main St, New York, NY 10001",
                tra1: "ORDER-" + Math.floor(100000000 + Math.random() * 900000000),
                item: "Wireless Headphones",
                qty: "1",
                asin: "B08" + Math.floor(1000000 + Math.random() * 9000000),
                reason: "Item defective or doesn't work",
                contentA: "Hello,\n\nI would like to request a refund for my recent order. The item arrived damaged and I am not satisfied with the quality.\n\nPlease let me know the next steps.\n\nThanks,\nJohn",
                contentB: "Hi John,\n\nWe are sorry to hear that. We have processed your refund request. You should see the amount credited to your account within 5-7 business days.\n\nLet us know if you need anything else.\n\nBest regards,\nSupport Team",
                // Additional fields for specific forms
                phone: "123-456-7890",
                merchant1: "Amazon",
                amount2: "",
                merchant2: "",
                tra2: ""
            });
        }

        // Default fallback
        return `[Generated ${type} based on: "${prompt}"]`;
    },

    parseStatement: async (file, password = null) => {
        try {
            console.log('Starting statement parsing for file:', file.name);
            
            // Extract text from PDF
            const pdfText = await extractTextFromPDF(file, password);
            console.log('PDF text extracted, length:', pdfText.length);
            console.log('First 500 characters:', pdfText.substring(0, 500));
            
            // Parse the text to extract transactions
            const result = parseStatementText(pdfText, file.name);
            console.log('Parsing complete. Transactions found:', result.transactions.length);
            console.log('Summary:', result.summary);
            
            return result;
        } catch (error) {
            console.error('Error parsing statement:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }
};

// Parse statement text to extract transactions
function parseStatementText(text, fileName) {
    console.log('Parsing statement text. Text length:', text.length);
    
    if (!text || text.trim().length === 0) {
        console.warn('Empty text provided for parsing');
        return generateFallbackResult('No text could be extracted from the PDF');
    }
    
    const transactions = [];
    // Split by newlines and also by multiple spaces (table format)
    const lines = text.split(/\n+/)
        .map(line => line.trim())
        .filter(line => line.length > 2); // Filter out very short lines
    
    console.log('Total lines to process:', lines.length);
    
    // Try to extract month and year from filename or text
    let statementMonth = new Date().getMonth() + 1;
    let statementYear = new Date().getFullYear();
    
    // Extract date from filename (common patterns: Statement_Jan2024, 2024-01, etc.)
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                       'july', 'august', 'september', 'october', 'november', 'december'];
    const monthAbbr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 
                      'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    
    const fileNameLower = fileName.toLowerCase();
    for (let i = 0; i < monthNames.length; i++) {
        if (fileNameLower.includes(monthNames[i]) || fileNameLower.includes(monthAbbr[i])) {
            statementMonth = i + 1;
            break;
        }
    }
    
    // Extract year from filename (4-digit year)
    const yearMatch = fileName.match(/\b(20\d{2})\b/);
    if (yearMatch) {
        statementYear = parseInt(yearMatch[1]);
    }
    
    // Also try to extract from text content
    const textLower = text.toLowerCase();
    for (let i = 0; i < monthNames.length; i++) {
        if (textLower.includes(monthNames[i]) || textLower.includes(monthAbbr[i])) {
            statementMonth = i + 1;
            break;
        }
    }
    
    const yearMatchText = text.match(/\b(20\d{2})\b/);
    if (yearMatchText) {
        statementYear = parseInt(yearMatchText[1]);
    }
    
    // Pattern matching for transactions
    // Common patterns in bank statements:
    // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
    // Amount patterns: ₹123.45, 123.45, 1,23,456.78, etc.
    
    const datePattern = /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/g;
    const amountPattern = /[₹$]?\s*(\d{1,3}(?:,\d{2,3})*(?:\.\d{2})?)/g;
    
    // Look for transaction-like lines
    let transactionId = 1;
    const seenTransactions = new Set();
    
    // More flexible date patterns
    const datePatterns = [
        /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/,  // DD/MM/YYYY
        /(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/,  // YYYY/MM/DD
        /(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+(\d{2,4})/i,  // DD Mon YYYY
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Skip header/footer lines (but be less strict)
        if (line.match(/^(statement|date|transaction|description|amount|balance|page|total)\s*$/i) && line.length < 30) {
            continue;
        }
        
        // Look for date in the line using multiple patterns
        let dateMatch = null;
        let day, month, year;
        
        for (const pattern of datePatterns) {
            const match = line.match(pattern);
            if (match) {
                dateMatch = match;
                if (pattern === datePatterns[0]) {
                    // DD/MM/YYYY format
                    day = parseInt(match[1]);
                    month = parseInt(match[2]);
                    year = parseInt(match[3]);
                } else if (pattern === datePatterns[1]) {
                    // YYYY/MM/DD format
                    year = parseInt(match[1]);
                    month = parseInt(match[2]);
                    day = parseInt(match[3]);
                } else if (pattern === datePatterns[2]) {
                    // DD Mon YYYY format
                    day = parseInt(match[1]);
                    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
                    month = monthNames.findIndex(m => match[2].toLowerCase().startsWith(m)) + 1;
                    year = parseInt(match[3]);
                }
                break;
            }
        }
        
        if (!dateMatch) continue;
        
        // Validate date
        if (year < 100) year += 2000;
        if (year < 2000 || year > 2100) continue; // Invalid year
        if (month < 1 || month > 12) continue; // Invalid month
        if (day < 1 || day > 31) continue; // Invalid day
        
        // Look for amount in the same line or next few lines
        let amount = null;
        let merchant = '';
        
        // More flexible amount patterns
        const amountPatterns = [
            /[₹$]\s*(\d{1,3}(?:,\d{2,3})*(?:\.\d{2})?)/,  // ₹123.45 or $123.45
            /(\d{1,3}(?:,\d{2,3})*(?:\.\d{2})?)\s*[₹$]/,  // 123.45₹
            /\b(\d{1,3}(?:,\d{2,3})*(?:\.\d{2})?)\b/,     // Just numbers
        ];
        
        // Check current line and next 3 lines for amount
        for (let j = 0; j < 4 && (i + j) < lines.length; j++) {
            const checkLine = lines[i + j];
            
            // Try each amount pattern
            for (const pattern of amountPatterns) {
                const amountMatches = [...checkLine.matchAll(new RegExp(pattern.source, 'g'))];
                
                if (amountMatches.length > 0) {
                    // Filter out very small amounts (likely not transactions) and very large (likely balances)
                    const amounts = amountMatches.map(m => {
                        const str = m[1].replace(/,/g, '');
                        return parseFloat(str);
                    }).filter(a => a > 0.01 && a < 10000000); // Reasonable transaction range
                    
                    if (amounts.length > 0) {
                        // Take the last reasonable amount (usually the transaction amount)
                        amount = amounts[amounts.length - 1];
                        
                        // Extract merchant/description (text before the amount, remove date)
                        let beforeAmount = checkLine.substring(0, checkLine.indexOf(amountMatches[amountMatches.length - 1][0])).trim();
                        // Remove date from merchant name
                        beforeAmount = beforeAmount.replace(/(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/g, '').trim();
                        
                        if (beforeAmount && beforeAmount.length > 2) {
                            merchant = beforeAmount;
                        } else if (j > 0 && lines[i + j - 1]) {
                            // Try previous line for merchant
                            merchant = lines[i + j - 1].replace(/(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/g, '').trim();
                        }
                        break;
                    }
                }
            }
            
            if (amount !== null) break;
        }
        
        // If we found a date and amount, create a transaction
        if (dateMatch && amount !== null && amount > 0) {
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const transactionKey = `${dateStr}_${amount}_${merchant.substring(0, 20)}`;
            
            // Avoid duplicates
            if (!seenTransactions.has(transactionKey)) {
                seenTransactions.add(transactionKey);
                
                // Clean up merchant name
                merchant = merchant.replace(/[₹$]\s*\d+[.,]\d+/g, '').trim();
                if (!merchant || merchant.length < 2) {
                    merchant = 'Unknown Merchant';
                }
                
                // Categorize transaction
                const category = categorizeTransaction(merchant);
                
                transactions.push({
                    id: transactionId++,
                    date: dateStr,
                    merchant: merchant.substring(0, 100), // Limit length
                    amount: amount.toFixed(2),
                    category: category,
                    notes: ''
                });
            }
        }
    }
    
    // If no transactions found with pattern matching, try alternative approach
    if (transactions.length === 0) {
        // Look for table-like structures
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const parts = line.split(/\s{2,}|\t/).filter(p => p.trim().length > 0);
            
            if (parts.length >= 3) {
                const dateMatch = parts[0].match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
                if (dateMatch) {
                    let day = parseInt(dateMatch[1]);
                    let month = parseInt(dateMatch[2]);
                    let year = parseInt(dateMatch[3]);
                    if (year < 100) year += 2000;
                    
                    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const merchant = parts.slice(1, -1).join(' ').trim();
                    const amountStr = parts[parts.length - 1].replace(/[₹$,]/g, '');
                    const amount = parseFloat(amountStr);
                    
                    if (!isNaN(amount) && amount > 0 && merchant.length > 2) {
                        transactions.push({
                            id: transactionId++,
                            date: dateStr,
                            merchant: merchant.substring(0, 100),
                            amount: amount.toFixed(2),
                            category: categorizeTransaction(merchant),
                            notes: ''
                        });
                    }
                }
            }
        }
    }
    
    // Calculate summary
    const totalSpend = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2);
    
    // Find top category
    const categoryCounts = {};
    transactions.forEach(t => {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });
    const topCategory = Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b, 'Other'
    );
    
    console.log(`Parsed ${transactions.length} transactions`);
    
    if (transactions.length === 0) {
        console.warn('No transactions found. Text sample:', text.substring(0, 1000));
        return generateFallbackResult('No transactions could be extracted from the PDF. The PDF format may not be supported.');
    }
    
    return {
        transactions: transactions,
        summary: {
            totalSpend: totalSpend,
            topCategory: topCategory || 'Other',
            transactionCount: transactions.length
        },
        statementMonth,
        statementYear
    };
}

// Categorize transaction based on merchant name
function categorizeTransaction(merchant) {
    const merchantLower = merchant.toLowerCase();
    
    // Travel
    if (merchantLower.match(/(uber|ola|lyft|taxi|cab|airline|flight|hotel|booking|travel|trip|expedia|makemytrip)/)) {
        return 'Travel';
    }
    
    // Meals
    if (merchantLower.match(/(restaurant|food|zomato|swiggy|uber eats|starbucks|cafe|pizza|burger|mcdonald|kfc|domino)/)) {
        return 'Meals';
    }
    
    // Software
    if (merchantLower.match(/(aws|azure|google cloud|software|saas|subscription|adobe|microsoft|apple|app store|play store)/)) {
        return 'Software';
    }
    
    // Office
    if (merchantLower.match(/(office|wework|co-working|stationery|supplies|equipment)/)) {
        return 'Office';
    }
    
    // Shopping
    if (merchantLower.match(/(amazon|flipkart|myntra|shop|store|retail)/)) {
        return 'Shopping';
    }
    
    return 'Other';
}

// Generate fallback result if parsing fails
function generateFallbackResult(reason = 'No transactions found') {
    const now = new Date();
    return {
        transactions: [
            {
                id: 1,
                date: now.toISOString().split('T')[0],
                merchant: reason,
                amount: '0.00',
                category: 'Other',
                notes: 'Please review the PDF manually and add transactions'
            }
        ],
        summary: {
            totalSpend: '0.00',
            topCategory: 'Other',
            transactionCount: 0
        },
        statementMonth: now.getMonth() + 1,
        statementYear: now.getFullYear()
    };
}
