import React from 'react';
import { useEmail } from '../context/EmailContext';
import '../styles/ControlPanel.css';

const StatusBarControls = () => {
    const { emailConfig, updateConfig } = useEmail();
    const { statusBar } = emailConfig;

    const handleChange = (key, value) => {
        updateConfig('statusBar', key, value);
    };

    return (
        <div className="control-section">
            <h3>Status Bar</h3>

            <div className="form-group">
                <label>Time</label>
                <input
                    type="text"
                    value={statusBar.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Network</label>
                    <input
                        type="text"
                        value={statusBar.network}
                        onChange={(e) => handleChange('network', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Signal</label>
                    <input
                        type="range"
                        min="0"
                        max="4"
                        value={statusBar.signal}
                        onChange={(e) => handleChange('signal', parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Battery %</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={statusBar.battery}
                        onChange={(e) => handleChange('battery', parseInt(e.target.value))}
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={statusBar.isCharging}
                            onChange={(e) => handleChange('isCharging', e.target.checked)}
                        />
                        Charging
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={statusBar.wifi}
                            onChange={(e) => handleChange('wifi', e.target.checked)}
                        />
                        Wi-Fi
                    </label>
                </div>
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={statusBar.airplaneMode}
                            onChange={(e) => handleChange('airplaneMode', e.target.checked)}
                        />
                        Airplane Mode
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Extra Icon</label>
                <select
                    value={statusBar.extraIcon}
                    onChange={(e) => handleChange('extraIcon', e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="location">Location</option>
                    <option value="dnd">Do Not Disturb</option>
                    <option value="alarm">Alarm</option>
                    <option value="bluetooth">Bluetooth</option>
                </select>
            </div>
        </div>
    );
};

export default StatusBarControls;
