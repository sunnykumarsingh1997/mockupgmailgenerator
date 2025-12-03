import React from 'react';
import './StatementsReader.css';

const StatementUnlocker = () => {
    return (
        <div className="statement-unlocker-container">
            <iframe
                src="http://84.247.136.87:8001"
                title="Statement Unlocker"
                className="external-app-iframe"
            />
        </div>
    );
};

export default StatementUnlocker;
