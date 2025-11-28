import React, { useState } from 'react';
import { useEmail } from '../context/EmailContext';
import { FaChevronLeft, FaEllipsisH, FaStar, FaReply, FaEllipsisV, FaArrowLeft, FaArchive, FaTrash, FaEnvelope, FaPrint, FaExternalLinkAlt } from 'react-icons/fa';
import { MdLabelImportantOutline, MdKeyboardArrowDown } from 'react-icons/md';

const EmailHeader = () => {
    const { emailConfig } = useEmail();
    const { header, device } = emailConfig;
    const [showDetails, setShowDetails] = useState(false);

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    const getRandomColor = (name) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#A1887F', '#90A4AE'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    if (device === 'pc') {
        return (
            <div className="email-header pc">
                {/* PC Top Bar (Gmail Logo area mock) */}
                <div className="pc-top-bar">
                    <div className="gmail-logo">
                        <span style={{ color: '#4285f4', fontWeight: 'bold', fontSize: '18px' }}>G</span>
                        <span style={{ color: '#db4437', fontWeight: 'bold', fontSize: '18px' }}>m</span>
                        <span style={{ color: '#f4b400', fontWeight: 'bold', fontSize: '18px' }}>a</span>
                        <span style={{ color: '#4285f4', fontWeight: 'bold', fontSize: '18px' }}>i</span>
                        <span style={{ color: '#0f9d58', fontWeight: 'bold', fontSize: '18px' }}>l</span>
                    </div>
                    <div className="pc-user-email">
                        {header.receiverEmail}
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

                {/* Sender Info */}
                <div className="pc-sender-row">
                    <div className="avatar">
                        {header.senderImage ? (
                            <img src={header.senderImage} alt="Sender" />
                        ) : (
                            <div
                                className="initial-circle"
                                style={{ backgroundColor: getRandomColor(header.senderName), width: '32px', height: '32px', fontSize: '16px' }}
                            >
                                {header.senderInitial || getInitials(header.senderName)}
                            </div>
                        )}
                    </div>
                    <div className="pc-sender-details">
                        <div className="pc-sender-line">
                            <span className="pc-sender-name">{header.senderName}</span>
                            <span className="pc-sender-email">&lt;{header.senderEmail}&gt;</span>
                        </div>
                        <div className="pc-receiver-line">
                            <span className="pc-to">to me</span>
                            <MdKeyboardArrowDown size={14} color="#5f6368" />
                        </div>
                    </div>
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

                {/* Sender Info */}
                <div className="android-sender-row" onClick={() => setShowDetails(!showDetails)}>
                    <div className="avatar">
                        {header.senderImage ? (
                            <img src={header.senderImage} alt="Sender" />
                        ) : (
                            <div
                                className="initial-circle"
                                style={{ backgroundColor: getRandomColor(header.senderName) }}
                            >
                                {header.senderInitial || getInitials(header.senderName)}
                            </div>
                        )}
                    </div>
                    <div className="android-sender-details">
                        <div className="sender-name-row">
                            <span className="sender-name">{header.senderName}</span>
                            <span className="email-time">{header.date}</span>
                        </div>
                        <div className="receiver-row">
                            <span className="receiver-text">{header.receiver}</span>
                            <MdKeyboardArrowDown size={16} color="#666" />
                        </div>
                        {showDetails && (
                            <div className="expanded-details">
                                <p>From: {header.senderName} &lt;{header.senderEmail}&gt;</p>
                                <p>To: {header.receiverEmail}</p>
                                <p>Date: {header.date}</p>
                            </div>
                        )}
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
                <div className="avatar">
                    {header.senderImage ? (
                        <img src={header.senderImage} alt="Sender" />
                    ) : (
                        <div
                            className="initial-circle"
                            style={{ backgroundColor: getRandomColor(header.senderName) }}
                        >
                            {header.senderInitial || getInitials(header.senderName)}
                        </div>
                    )}
                </div>
                <div className="sender-details">
                    <div className="sender-top">
                        <span className="sender-name">{header.senderName}</span>
                        <span className="email-date">{header.date}</span>
                    </div>
                    <div className="sender-bottom">
                        <span className="receiver-label">{header.receiver}</span>
                        <span className="details-link">Hide</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailHeader;
