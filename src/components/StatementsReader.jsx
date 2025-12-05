import React from 'react';
import './StatementsReader.css';

const StatementUnlocker = () => {
    return (
        <div className="statement-unlocker-container">
            <iframe
                src="https://pdf.codershive.in/"
                title="Statement Unlocker"
                className="external-app-iframe"
                allow="clipboard-read; clipboard-write"
            />
        </div>
    );
};

export default StatementUnlocker;
