import React from 'react';
import ControlPanel from './ControlPanel';
import PreviewPane from './PreviewPane';
import '../styles/Layout.css';

const Layout = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Fake Email Generator</h1>
            </header>
            <main className="main-content">
                <div className="control-panel-wrapper">
                    <ControlPanel />
                </div>
                <div className="preview-pane-wrapper">
                    <PreviewPane />
                </div>
            </main>
            <footer className="app-footer">
                <p>Developed by <a href="mailto:idaniesldev@gmail.com">idaniesldev@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Layout;
