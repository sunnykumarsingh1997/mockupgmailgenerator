import React from 'react';
import { EmailProvider } from './context/EmailContext';
import Layout from './components/Layout';
import './styles/global.css';

function App() {
  return (
    <EmailProvider>
      <Layout />
    </EmailProvider>
  );
}

export default App;
