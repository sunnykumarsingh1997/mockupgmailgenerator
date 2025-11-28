import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const navStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '10px',
        background: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    };

    const linkStyle = (isActive) => ({
        textDecoration: 'none',
        color: isActive ? '#1a73e8' : '#5f6368',
        fontWeight: isActive ? 'bold' : 'normal',
        padding: '5px 10px',
        borderRadius: '4px',
        background: isActive ? '#e8f0fe' : 'transparent'
    });

    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle(location.pathname === '/')}>
                Email Generator
            </Link>
            <Link to="/invoice" style={linkStyle(location.pathname === '/invoice')}>
                Invoice Generator
            </Link>
            <Link to="/history" style={linkStyle(location.pathname === '/history')}>
                History
            </Link>
        </nav>
    );
};

export default Navigation;
