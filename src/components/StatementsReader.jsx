import React from 'react';

const StatementUnlocker = () => {
    const handleOpenUnlocker = () => {
        window.open('http://84.247.136.87:8001', '_blank', 'noopener,noreferrer');
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 60px)',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        padding: '20px'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '60px 80px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    };

    const iconStyle = {
        fontSize: '80px',
        marginBottom: '20px'
    };

    const titleStyle = {
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: '600',
        marginBottom: '15px',
        fontFamily: "'Segoe UI', sans-serif"
    };

    const descriptionStyle = {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1.1rem',
        marginBottom: '40px',
        maxWidth: '400px',
        lineHeight: '1.6'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        color: '#fff',
        border: 'none',
        padding: '18px 50px',
        fontSize: '1.1rem',
        fontWeight: '600',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(17, 153, 142, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={iconStyle}>📄</div>
                <h1 style={titleStyle}>Statement Unlocker</h1>
                <p style={descriptionStyle}>
                    Unlock password-protected bank statements and upload them to Paperless-ngx.
                    Opens in a new tab for full functionality.
                </p>
                <button 
                    style={buttonStyle}
                    onClick={handleOpenUnlocker}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 15px 40px rgba(17, 153, 142, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 30px rgba(17, 153, 142, 0.4)';
                    }}
                >
                    <span>🔓</span> Open Statement Unlocker
                </button>
            </div>
        </div>
    );
};

export default StatementUnlocker;
