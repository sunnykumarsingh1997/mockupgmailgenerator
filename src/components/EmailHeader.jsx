import React from 'react';
import { useEmail } from '../context/EmailContext';
import { FaChevronLeft, FaStar, FaReply, FaEllipsisV, FaArrowLeft, FaArchive, FaTrash, FaEnvelope, FaPrint, FaExternalLinkAlt } from 'react-icons/fa';
import gmailLogo from '../assets/gmail_logo.png';

const EmailHeader = () => {
    const { emailConfig } = useEmail();
    const { header, device } = emailConfig;

    if (device === 'pc') {
        return (
            <div className="email-header pc">
                {/* PC Top Bar (Gmail Logo area mock) */}
                {/* PC Top Bar (Gmail Logo area mock) */}
                <div className="pc-top-bar">
                    <div className="gmail-logo">
                        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Gmail" style={{ height: '20px', objectFit: 'contain' }} />
                    </div>
                </div>

                {/* Subject */}
                <div className="pc-subject-row">
                    <h2 className="pc-subject">{header.subject}</h2>
                    <div className="pc-labels">
                        <span className="label-inbox">Inbox</span>
                        <span className="label-x">x</span>
                    </div>
                    <div className="pc-print-icon">
                        <FaPrint size={16} color="#5f6368" />
                        <FaExternalLinkAlt size={14} color="#5f6368" style={{ marginLeft: '15px' }} />
                    </div>
                </div>

                {/* Date and Actions */}
                <div className="pc-sender-row">
                    <div className="pc-date-actions">
                        <span className="pc-date">{header.date}</span>
                        <div className="pc-actions">
                            <FaStar size={16} color="#5f6368" />
                            <FaReply size={16} color="#5f6368" />
                            <FaEllipsisV size={16} color="#5f6368" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (device === 'android') {
        return (
            <div className="email-header android">
                {/* Android Top Bar */}
                <div className="android-top-bar">
                    <FaArrowLeft size={20} color="#444" />
                    <div className="android-actions">
                        <FaArchive size={20} color="#444" />
                        <FaTrash size={18} color="#444" />
                        <FaEnvelope size={18} color="#444" />
                        <FaEllipsisV size={18} color="#444" />
                    </div>
                </div>

                {/* Subject */}
                <div className="android-subject-row">
                    <h2 className="android-subject">{header.subject}</h2>
                    <div className="android-labels">
                        <span className="label-inbox">{header.mailbox}</span>
                        <FaStar size={20} color="#444" style={{ marginLeft: 'auto' }} />
                    </div>
                </div>

                {/* Date and Actions */}
                <div className="android-sender-row">
                    <div className="android-date-time">
                        <span className="email-time">{header.date}</span>
                    </div>
                    <div className="android-reply-actions">
                        <FaReply size={18} color="#444" />
                        <FaEllipsisV size={18} color="#444" style={{ marginLeft: '15px' }} />
                    </div>
                </div>
            </div>
        );
    }

    // iOS Style
    return (
        <div className="email-header ios">
            <div className="nav-bar">
                <div className="left-nav">
                    <FaChevronLeft color="#007aff" />
                    <span className="mailbox-name">{header.mailbox}</span>
                </div>
                <div className="right-nav">
                    <span style={{ color: '#007aff' }}>Edit</span>
                </div>
            </div>

            <div className="subject-area">
                <div className="subject-line" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <h2>{header.subject}</h2>
                    <FaStar color="#d2d2d7" />
                </div>
            </div>

            <div className="sender-info">
                <div className="sender-details">
                    <div className="sender-top">
                        <span className="email-date">{header.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailHeader;
