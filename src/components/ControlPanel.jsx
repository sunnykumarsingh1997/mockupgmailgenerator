import React from 'react';
import StatusBarControls from './StatusBarControls';
import HeaderControls from './HeaderControls';
import ContentControls from './ContentControls';
import ActionControls from './ActionControls';
import ExportManager from './ExportManager'; // Will create this next

const ControlPanel = () => {
    return (
        <div className="control-panel">
            <StatusBarControls />
            <HeaderControls />
            <ContentControls />
            <ActionControls />
            <ExportManager />
        </div>
    );
};

export default ControlPanel;
