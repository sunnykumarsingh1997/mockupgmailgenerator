import React from 'react';
import { useEmail } from '../context/EmailContext';

const ActionControls = () => {
    const { emailConfig, updateConfig } = useEmail();
    const { actions } = emailConfig;

    const handleChange = (key, value) => {
        updateConfig('actions', key, value);
    };

    return (
        <div className="control-section">
            <h3>Actions & Metadata</h3>

            <div className="form-row">
                <div className="form-group">
                    <label>Reply Label</label>
                    <input
                        type="text"
                        value={actions.replyText}
                        onChange={(e) => handleChange('replyText', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Forward Label</label>
                    <input
                        type="text"
                        value={actions.forwardText}
                        onChange={(e) => handleChange('forwardText', e.target.value)}
                    />
                </div>
            </div>



            <div className="form-group">
                <label>Footer Text</label>
                <input
                    type="text"
                    value={actions.footerText}
                    onChange={(e) => handleChange('footerText', e.target.value)}
                />
            </div>
        </div>
    );
};

export default ActionControls;
