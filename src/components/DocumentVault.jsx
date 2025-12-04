import React from 'react';
import './StatementsReader.css';

const DocumentVault = () => {
    return (
        <div className="statement-unlocker-container">
            <iframe
                src="https://docs.codershive.in/"
                title="Document Vault"
                className="external-app-iframe"
                allow="clipboard-read; clipboard-write"
            />
        </div>
    );
};

export default DocumentVault;
