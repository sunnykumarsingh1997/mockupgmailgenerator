import React from 'react';
import { useEmail } from '../context/EmailContext';
import { FaFilePdf } from 'react-icons/fa';

const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};

const getRandomColor = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#A1887F', '#90A4AE'];
    let hash = 0;
    if (name) {
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
    }
    return colors[Math.abs(hash) % colors.length];
};

const EmailBody = () => {
    const { emailConfig } = useEmail();
    const { content, device } = emailConfig;

    return (
        <div className={`email-body ${device}`}>
            {content.messages.map((msg, index) => (
                <div key={msg.id} className={`message-item ${msg.isMe ? 'is-me' : ''}`} style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: index < content.messages.length - 1 ? '1px solid #eee' : 'none' }}>
                    {/* Message Header for Multi-thread */}
                    <div className="message-header" style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                        <div className="avatar" style={{ flexShrink: 0 }}>
                            {msg.senderImage ? (
                                <img src={msg.senderImage} alt="Sender" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <div
                                    className="initial-circle"
                                    style={{
                                        backgroundColor: getRandomColor(msg.sender || ''),
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {msg.senderInitial || getInitials(msg.sender || '')}
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#202124' }}>
                                    {msg.sender || 'Unknown'}
                                    <span style={{ fontWeight: 'normal', color: '#5f6368', fontSize: '12px', marginLeft: '5px' }}>
                                        &lt;{msg.senderEmail || ''}&gt;
                                    </span>
                                </span>
                                <span style={{ fontSize: '12px', color: '#5f6368' }}>{msg.time}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#5f6368', marginTop: '2px', display: 'flex', alignItems: 'center' }}>
                                to {msg.receiver || 'me'}
                                <span style={{ marginLeft: '5px' }}>&lt;{msg.receiverEmail || ''}&gt;</span>
                            </div>
                        </div>
                    </div>

                    <div className="email-content-text" style={{ textAlign: 'left' }}>
                        {msg.isHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: msg.body }} />
                        ) : (
                            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.body}</div>
                        )}
                    </div>
                </div>
            ))}

            {content.hasAttachment && (
                <div className="attachment-row">
                    <div className="attachment-icon">
                        <FaFilePdf size={24} color="#ff3b30" />
                    </div>
                    <div className="attachment-info">
                        <span className="filename">Document.pdf</span>
                        <span className="filesize">2.4 MB</span>
                    </div>
                </div>
            )}

            {content.hasTemplate && (
                <div className="template-footer">
                    <div className="template-line"></div>
                    <p>Check out our latest updates</p>
                    <button>View More</button>
                </div>
            )}

            {device === 'pc' && (
                <button
                    onClick={() => {
                        const container = document.querySelector('.scrollable-content');
                        if (container) {
                            container.scrollBy({ top: 100, behavior: 'smooth' });
                        }
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#1a73e8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '24px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px'
                    }}
                >
                    Scroll Down ▼
                </button>
            )}
        </div>
    );
};

export default EmailBody;
