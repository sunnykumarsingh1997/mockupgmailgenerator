import React from 'react';
import { useEmail } from '../context/EmailContext';
import StatusBar from './StatusBar';
import EmailHeader from './EmailHeader';
import EmailBody from './EmailBody';
import EmailActions from './EmailActions';
import '../styles/PreviewPane.css';

const PreviewPane = () => {
    const { emailConfig } = useEmail();
    const { device, watermark } = emailConfig;

    return (
        <div className="preview-container">
            <div className={`mobile-frame ${device}`} id="email-preview-frame">
                <div className="screen-content">
                    {device !== 'pc' && <StatusBar />}
                    <div className={device === 'pc' ? 'pc-header-spacer' : 'app-header-spacer'}></div>
                    <div className="scrollable-content">
                        <EmailHeader />
                        <EmailBody />
                        <EmailActions />
                    </div>

                    {watermark.visible && (
                        <div className="watermark-overlay">
                            Fake Email Generator
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewPane;
