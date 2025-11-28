import React, { useState } from 'react';
import background from '../assets/background2.jpg';
import logo from '../assets/codershive_dp.png';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'codershive' && password === 'Coders#1234') {
            onLogin();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{
            backgroundColor: '#f0f2f5',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif"
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <img src={logo} alt="Codershive Logo" style={{ width: '80px', marginBottom: '20px' }} />
                <h2 style={{ margin: '0 0 20px', color: '#333' }}>Welcome Back</h2>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />

                    {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}

                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#007bff',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
