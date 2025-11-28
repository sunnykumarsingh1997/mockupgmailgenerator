import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
    const [emailConfig, setEmailConfig] = useState({
        device: 'iphone', // 'iphone' | 'android'
        statusBar: {
            time: '9:41',
            network: '5G',
            battery: 100,
            isCharging: false,
            signal: 4,
            wifi: true,
            airplaneMode: false,
            extraIcon: 'none',
        },
        header: {
            mailbox: 'Inbox',
            subject: 'Project Update',
            senderName: 'Mirakle',
            senderEmail: 'mirakle@example.com',
            senderInitial: 'M',
            senderImage: null,
            receiver: 'to me',
            receiverEmail: 'me@example.com',
            date: '21:20',
        },
        content: {
            messages: [
                {
                    id: 1,
                    sender: 'Mirakle',
                    body: 'Hi there,\n\nHere is the update you requested. Let me know if you need anything else.',
                    time: '21:20',
                    isMe: false,
                    isHtml: false,
                }
            ],
            hasAttachment: false,
            hasTemplate: false,
        },
        actions: {
            replyText: 'Reply',
            forwardText: 'Forward',
            showReactions: true,
            footerText: '',
        },
        watermark: {
            visible: false,
        }
    });

    const updateConfig = (section, key, value) => {
        setEmailConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const updateRootConfig = (key, value) => {
        setEmailConfig(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <EmailContext.Provider value={{ emailConfig, updateConfig, updateRootConfig }}>
            {children}
        </EmailContext.Provider>
    );
};
