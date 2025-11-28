import React from 'react';
import { useEmail } from '../context/EmailContext';

const ContentControls = () => {
    const { emailConfig, updateConfig } = useEmail();
    const { content } = emailConfig;

    const handleMessageChange = (id, key, value) => {
        const newMessages = content.messages.map(msg =>
            msg.id === id ? { ...msg, [key]: value } : msg
        );
        updateConfig('content', 'messages', newMessages);
    };

    const addMessage = () => {
        const newId = Math.max(...content.messages.map(m => m.id), 0) + 1;
        const newMessage = {
            id: newId,
            sender: 'Me',
            body: '',
            time: '21:25',
            isMe: true,
            isHtml: false,
        };
        updateConfig('content', 'messages', [...content.messages, newMessage]);
    };

    const removeMessage = (id) => {
        if (content.messages.length <= 1) return;
        const newMessages = content.messages.filter(msg => msg.id !== id);
        updateConfig('content', 'messages', newMessages);
    };

    const handleGlobalChange = (key, value) => {
        updateConfig('content', key, value);
    };

    return (
        <div className="control-section">
            <h3>Email Content</h3>

            {content.messages.map((msg, index) => (
                <div key={msg.id} className="message-block" style={{ marginBottom: '20px', padding: '10px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h4 style={{ fontSize: '0.9rem', margin: 0 }}>Message {index + 1}</h4>
                        {content.messages.length > 1 && (
                            <button onClick={() => removeMessage(msg.id)} style={{ color: 'red', border: 'none', background: 'none', fontSize: '0.8rem' }}>Remove</button>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Sender Name</label>
                            <input
                                type="text"
                                value={msg.sender}
                                onChange={(e) => handleMessageChange(msg.id, 'sender', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="text"
                                value={msg.time}
                                onChange={(e) => handleMessageChange(msg.id, 'time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={msg.isMe}
                                onChange={(e) => handleMessageChange(msg.id, 'isMe', e.target.checked)}
                            />
                            Is Me (Right side / Different color)
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Body Content</label>
                        <textarea
                            value={msg.body}
                            onChange={(e) => handleMessageChange(msg.id, 'body', e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>
            ))}

            <button onClick={addMessage} style={{ width: '100%', padding: '8px', marginBottom: '20px', background: '#eee', border: 'none', borderRadius: '6px' }}>
                + Add Another Message
            </button>

            <div className="form-row">
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={content.hasAttachment}
                            onChange={(e) => handleGlobalChange('hasAttachment', e.target.checked)}
                        />
                        Add Attachment (Bottom)
                    </label>
                </div>
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={content.hasTemplate}
                            onChange={(e) => handleGlobalChange('hasTemplate', e.target.checked)}
                        />
                        Add Template Footer
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ContentControls;
