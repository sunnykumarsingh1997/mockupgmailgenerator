import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiService } from '../services/GeminiService';
import { FaMagic, FaTimes, FaSpinner } from 'react-icons/fa';

const GeminiPromptModal = ({ isOpen, onClose, onGenerate, type }) => {
    const [prompt, setPrompt] = useState('');
    const [messageCount, setMessageCount] = useState(3);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await GeminiService.generateContent(type, prompt, messageCount);
            onGenerate(result);
            onClose();
        } catch (error) {
            console.error("Generation failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="gemini-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000
                }}
            >
                <motion.div
                    className="gemini-modal-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#4285f4' }}>
                            <FaMagic /> Fill with Gemini
                        </h3>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                            <FaTimes />
                        </button>
                    </div>

                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        Describe what you want to generate for <strong>{type}</strong>:
                    </p>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., Angry customer asking for refund..."
                        style={{
                            width: '100%',
                            height: '80px',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            marginBottom: '15px',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />

                    {type === 'email_thread' && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                                Number of Messages:
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={messageCount}
                                onChange={(e) => setMessageCount(parseInt(e.target.value))}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #ddd'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: '1px solid #ddd',
                                background: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !prompt.trim()}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: loading ? '#ccc' : 'linear-gradient(135deg, #4285f4, #9b72cb, #d96570)',
                                color: 'white',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: 'bold'
                            }}
                        >
                            {loading ? <FaSpinner className="spin" /> : <FaMagic />}
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GeminiPromptModal;
