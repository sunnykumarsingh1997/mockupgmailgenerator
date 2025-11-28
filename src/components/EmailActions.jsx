import React from 'react';
import { useEmail } from '../context/EmailContext';
import { FaReply, FaShare, FaSmile, FaThumbsUp, FaHeart } from 'react-icons/fa';

const EmailActions = () => {
    const { emailConfig } = useEmail();
    const { actions, device } = emailConfig;

    return (
        <div className={`email-actions ${device}`}>
            {actions.showReactions && (
                <div className="reactions-row">
                    <button className="reaction-btn"><FaThumbsUp /></button>
                    <button className="reaction-btn"><FaHeart /></button>
                    <button className="reaction-btn"><FaSmile /></button>
                </div>
            )}

            <div className="action-buttons-row">
                <button className="action-btn reply">
                    <FaReply /> {actions.replyText}
                </button>
                <button className="action-btn forward">
                    <FaShare /> {actions.forwardText}
                </button>
            </div>

            {actions.footerText && (
                <div className="footer-text">
                    {actions.footerText}
                </div>
            )}
        </div>
    );
};

export default EmailActions;
