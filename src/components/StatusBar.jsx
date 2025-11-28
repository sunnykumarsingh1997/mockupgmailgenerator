import React from 'react';
import { useEmail } from '../context/EmailContext';
import { FaWifi, FaSignal, FaBatteryFull, FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty, FaBolt, FaPlane, FaBluetoothB, FaMoon, FaMapMarkerAlt, FaBellSlash } from 'react-icons/fa';

const StatusBar = () => {
    const { emailConfig } = useEmail();
    const { statusBar, device } = emailConfig;

    const getBatteryIcon = () => {
        if (statusBar.battery > 90) return <FaBatteryFull />;
        if (statusBar.battery > 75) return <FaBatteryThreeQuarters />;
        if (statusBar.battery > 50) return <FaBatteryHalf />;
        if (statusBar.battery > 25) return <FaBatteryQuarter />;
        return <FaBatteryEmpty />;
    };

    const getExtraIcon = () => {
        switch (statusBar.extraIcon) {
            case 'location': return <FaMapMarkerAlt size={12} />;
            case 'dnd': return <FaMoon size={12} />;
            case 'bluetooth': return <FaBluetoothB size={12} />;
            case 'alarm': return <FaBellSlash size={12} />;
            default: return null;
        }
    };

    if (device === 'android') {
        return (
            <div className="status-bar android">
                <div className="left">
                    <span className="time">{statusBar.time}</span>
                </div>
                <div className="right">
                    {getExtraIcon()}
                    {statusBar.airplaneMode ? <FaPlane size={14} /> : (
                        <>
                            {statusBar.wifi && <FaWifi size={16} />}
                            <div className="signal-strength">
                                <FaSignal size={14} />
                            </div>
                            <span className="network" style={{ fontSize: '10px', marginLeft: '2px' }}>{statusBar.network}</span>
                        </>
                    )}
                    <div className="battery-wrapper">
                        {statusBar.isCharging ? <FaBolt size={12} /> : getBatteryIcon()}
                    </div>
                </div>
            </div>
        );
    }

    // iOS Style
    return (
        <div className="status-bar ios">
            <div className="left">
                <span className="time">{statusBar.time}</span>
                {getExtraIcon()}
            </div>
            <div className="notch-area"></div>
            <div className="right">
                {statusBar.airplaneMode ? <FaPlane size={14} /> : (
                    <>
                        <span className="network">{statusBar.network}</span>
                        {statusBar.wifi && <FaWifi size={14} />}
                    </>
                )}
                <div className="battery-wrapper">
                    {statusBar.isCharging && <FaBolt size={10} className="charging-icon" />}
                    <div className="ios-battery">
                        <div className="level" style={{ width: `${statusBar.battery}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
