import React, { useRef } from 'react';
import { useEmail } from '../context/EmailContext';

const HeaderControls = () => {
    const { emailConfig, updateConfig, updateRootConfig } = useEmail();
    const { header, device } = emailConfig;
    const fileInputRef = useRef(null);

    const handleChange = (key, value) => {
        updateConfig('header', key, value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('senderImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        handleChange('senderImage', null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="control-section">
            <h3>Header / Mailbox</h3>

            <div className="form-group">
                <label>Device Style</label>
                <select
                    value={device}
                    onChange={(e) => updateRootConfig('device', e.target.value)}
                >
                    <option value="iphone">iPhone (iOS)</option>
                    <option value="android">Android</option>
                    <option value="pc">PC / Web (Gmail)</option>
                </select>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Mailbox Title</label>
                    <input
                        type="text"
                        value={header.mailbox}
                        onChange={(e) => handleChange('mailbox', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date/Time</label>
                    <input
                        type="text"
                        value={header.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Subject Line</label>
                <input
                    type="text"
                    value={header.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Sender Name</label>
                    <input
                        type="text"
                        value={header.senderName}
                        onChange={(e) => handleChange('senderName', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Sender Email</label>
                    <input
                        type="text"
                        value={header.senderEmail}
                        onChange={(e) => handleChange('senderEmail', e.target.value)}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Initial</label>
                    <input
                        type="text"
                        maxLength="2"
                        value={header.senderInitial}
                        onChange={(e) => handleChange('senderInitial', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Sender Profile Image</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            style={{ fontSize: '0.8rem', width: '100%' }}
                        />
                        {header.senderImage && (
                            <button
                                onClick={clearImage}
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
                    <label>Receiver Label</label>
                    <input
                        type="text"
                        value={header.receiver}
                        onChange={(e) => handleChange('receiver', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Receiver Email</label>
                    <input
                        type="text"
                        value={header.receiverEmail}
                        onChange={(e) => handleChange('receiverEmail', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderControls;
