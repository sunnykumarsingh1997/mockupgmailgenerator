import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmailProvider } from './context/EmailContext';
import Layout from './components/Layout';
import InvoiceGenerator from './components/invoice/InvoiceGenerator';
import Navigation from './components/Navigation';
import Login from './components/Login';
import HistoryManager from './components/HistoryManager';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-root">
        {!isAuthenticated ? (
          <Login onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <Navigation />
            <Routes>
              <Route path="/" element={
                <EmailProvider>
                  <Layout />
                </EmailProvider>
              } />
              <Route path="/invoice" element={<InvoiceGenerator />} />
              <Route path="/history" element={<HistoryManager />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
