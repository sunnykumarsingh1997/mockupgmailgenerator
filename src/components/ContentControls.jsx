import React, { useState, useRef } from 'react';
import { useEmail } from '../context/EmailContext';
import GeminiFillButton from './GeminiFillButton';

const ContentControls = () => {
    const { emailConfig, updateConfig } = useEmail();
    const { content, header } = emailConfig;
    const [activeMsgId, setActiveMsgId] = useState(content.messages[0]?.id);
    const fileInputRefs = useRef({});

    const handleContentChange = (key, value) => {
        updateConfig('content', key, value);
    };

    const updateMessage = (id, key, value) => {
        const updatedMessages = content.messages.map(msg =>
            msg.id === id ? { ...msg, [key]: value } : msg
        );
        handleContentChange('messages', updatedMessages);
    };

    const addMessage = () => {
        const newMsg = {
            id: Date.now(),
            sender: header.senderName || '', // Default to main sender
            senderEmail: header.senderEmail || '',
            receiver: header.receiver || '',
            receiverEmail: header.receiverEmail || '',
            senderInitial: '',
            senderImage: null,
            time: '10:00 AM',
            body: 'New message...',
            isMe: false,
            isHtml: false
        };
        handleContentChange('messages', [...content.messages, newMsg]);
        setActiveMsgId(newMsg.id);
    };

    const handleImageUpload = (msgId, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateMessage(msgId, 'senderImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = (msgId) => {
        updateMessage(msgId, 'senderImage', null);
        if (fileInputRefs.current[msgId]) {
            fileInputRefs.current[msgId].value = '';
        }
    };

    const removeMessage = (id) => {
        if (content.messages.length > 1) {
            const updatedMessages = content.messages.filter(msg => msg.id !== id);
            handleContentChange('messages', updatedMessages);
            setActiveMsgId(updatedMessages[0].id);
        }
    };

    const activeMessage = content.messages.find(m => m.id === activeMsgId) || content.messages[0];

    return (
        <div className="control-section">
            <h3>Email Content</h3>

            <div className="message-list-controls" style={{ marginBottom: '15px', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                {content.messages.map((msg, index) => (
                    <button
                        key={msg.id}
                        onClick={() => setActiveMsgId(msg.id)}
                        style={{
                            padding: '5px 10px',
                            border: activeMsgId === msg.id ? '2px solid var(--accent-color)' : '1px solid #ccc',
                            borderRadius: '15px',
                            background: activeMsgId === msg.id ? '#e3f2fd' : '#f5f5f5',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Msg {index + 1}
                    </button>
                ))}
                <button onClick={addMessage} style={{ padding: '5px 10px', borderRadius: '15px', border: '1px dashed #999', cursor: 'pointer' }}>+</button>
            </div>

            <div style={{ marginBottom: '15px', padding: '10px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><strong>AI Thread Generator:</strong> Create a full conversation.</span>
                <GeminiFillButton type="email_thread" onFill={(messages) => {
                    handleContentChange('messages', messages);
                    setActiveMsgId(messages[0].id);
                }} />
            </div>

            {activeMessage && (
                <div className="active-message-editor" style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h4>Editing Message</h4>
                        {content.messages.length > 1 && (
                            <button onClick={() => removeMessage(activeMessage.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Sender Name</label>
                            <input
                                type="text"
                                value={activeMessage.sender || ''}
                                onChange={(e) => updateMessage(activeMessage.id, 'sender', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sender Email</label>
                            <input
                                type="text"
                                value={activeMessage.senderEmail || ''}
                                onChange={(e) => updateMessage(activeMessage.id, 'senderEmail', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Initial</label>
                            <input
                                type="text"
                                maxLength="2"
                                value={activeMessage.senderInitial || ''}
                                onChange={(e) => updateMessage(activeMessage.id, 'senderInitial', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sender Profile Image</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={(el) => fileInputRefs.current[activeMessage.id] = el}
                                    onChange={(e) => handleImageUpload(activeMessage.id, e)}
                                    style={{ fontSize: '0.8rem', width: '100%' }}
                                />
                                {activeMessage.senderImage && (
                                    <button
                                        onClick={() => clearImage(activeMessage.id)}
                                        style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#ff3b30', color: 'white', border: 'none', borderRadius: '4px' }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Receiver Name</label>
                            <input
                                type="text"
                                value={activeMessage.receiver || ''}
                                onChange={(e) => updateMessage(activeMessage.id, 'receiver', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Receiver Email</label>
                            <input
                                type="text"
                                value={activeMessage.receiverEmail || ''}
                                onChange={(e) => updateMessage(activeMessage.id, 'receiverEmail', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="text"
                                value={activeMessage.time}
                                onChange={(e) => updateMessage(activeMessage.id, 'time', e.target.value)}
                            />
                        </div>
                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={activeMessage.isMe}
                                    onChange={(e) => updateMessage(activeMessage.id, 'isMe', e.target.checked)}
                                />
                                Sent by Me (Right side)
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Body Text
                                    <GeminiFillButton type="email_body" onFill={(val) => updateMessage(activeMessage.id, 'body', val)} />
                                </div>
                                <span style={{ fontSize: '0.8em' }}>
                                    <input
                                        type="checkbox"
                                        checked={activeMessage.isHtml}
                                        onChange={(e) => updateMessage(activeMessage.id, 'isHtml', e.target.checked)}
                                    /> HTML Mode
                                </span>
                            </div>
                        </label>
                        <textarea
                            rows="6"
                            value={activeMessage.body}
                            onChange={(e) => updateMessage(activeMessage.id, 'body', e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className="form-group checkbox-group" style={{ marginTop: '15px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={content.hasAttachment}
                        onChange={(e) => handleContentChange('hasAttachment', e.target.checked)}
                    />
                    Show Attachment Placeholder
                </label>
            </div>

            <div className="form-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={content.hasTemplate}
                        onChange={(e) => handleContentChange('hasTemplate', e.target.checked)}
                    />
                    Show Template Footer
                </label>
            </div>
        </div>
    );
};

export default ContentControls;
