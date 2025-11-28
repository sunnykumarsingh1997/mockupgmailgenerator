import React from 'react';
import { useEmail } from '../context/EmailContext';
import { FaFilePdf } from 'react-icons/fa';

const EmailBody = () => {
    const { emailConfig } = useEmail();
    const { content, device } = emailConfig;

    return (
        <div className={`email-body ${device}`}>
            {content.messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.isMe ? 'is-me' : ''}`}>
                    <div className="message-meta">
                        {device === 'android' && !msg.isMe && (
                            // Android often hides sender name in thread if it's the same, but for now we show it or just body
                            // Actually in the reference image, it's just the body. The header handles the first sender.
                            // But for multi-thread, we need to distinguish.
                            // Let's keep it simple: just the body text, maybe a small header if it's a long thread.
                            <span className="thread-sender">{msg.sender}</span>
                        )}
                        <span className="thread-time">{msg.time}</span>
                    </div>

                    <div className="email-content-text">
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
        </div>
    );
};

export default EmailBody;
