import React from 'react';
import { useEmail } from '../context/EmailContext';

const HeaderControls = () => {
    const { emailConfig, updateConfig, updateRootConfig } = useEmail();
    const { header, device } = emailConfig;

    const handleChange = (key, value) => {
        updateConfig('header', key, value);
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

            <div className="form-group">
                <label>Mailbox Title</label>
                <input
                    type="text"
                    value={header.mailbox}
                    onChange={(e) => handleChange('mailbox', e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Subject Line</label>
                <input
                    type="text"
                    value={header.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                />
            </div>
        </div>
    );
};

export default HeaderControls;
