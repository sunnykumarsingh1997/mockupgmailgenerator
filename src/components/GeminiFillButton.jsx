import React, { useState } from 'react';
import { FaMagic } from 'react-icons/fa';
import GeminiPromptModal from './GeminiPromptModal';

const GeminiFillButton = ({ onFill, type, style = {} }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerate = (content) => {
        onFill(content);
    };

    return (
        <>
            <button
                className="gemini-fill-btn"
                onClick={() => setIsModalOpen(true)}
                title={`Fill ${type} with Gemini`}
                style={{
                    background: 'linear-gradient(135deg, #4285f4, #9b72cb, #d96570)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '12px',
                    marginLeft: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s',
                    ...style
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <FaMagic />
            </button>

            <GeminiPromptModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGenerate={handleGenerate}
                type={type}
            />
        </>
    );
};

export default GeminiFillButton;
