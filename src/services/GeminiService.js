// Mock Gemini Service
// In a real app, this would call the Google Gemini API

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

    parseStatement: async (file) => {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock data extraction
        const transactions = [
            { id: 1, date: '2024-03-15', merchant: 'Uber Rides', amount: '24.50', category: 'Travel', notes: 'Airport ride' },
            { id: 2, date: '2024-03-16', merchant: 'Starbucks', amount: '5.75', category: 'Meals', notes: 'Coffee' },
            { id: 3, date: '2024-03-18', merchant: 'AWS Services', amount: '145.00', category: 'Software', notes: 'Monthly hosting' },
            { id: 4, date: '2024-03-20', merchant: 'Delta Airlines', amount: '450.00', category: 'Travel', notes: 'Conference flight' },
            { id: 5, date: '2024-03-22', merchant: 'WeWork', amount: '350.00', category: 'Office', notes: 'Desk rental' },
        ];

        const totalSpend = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2);

        return {
            transactions,
            summary: {
                totalSpend,
                topCategory: 'Travel'
            }
        };
    }
};
