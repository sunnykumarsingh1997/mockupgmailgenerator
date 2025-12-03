import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { EmailProvider } from './context/EmailContext';
import Layout from './components/Layout';
import InvoiceGenerator from './components/invoice/InvoiceGenerator';
import StatementsReader from './components/StatementsReader';
import DocumentVault from './components/DocumentVault';
import Navigation from './components/Navigation';
import Login from './components/Login';
import HistoryManager from './components/HistoryManager';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-root">
        {!session ? (
          <Login />
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
              <Route path="/statements" element={<StatementsReader />} />
              <Route path="/vault" element={<DocumentVault />} />
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
