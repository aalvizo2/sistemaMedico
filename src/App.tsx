import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import AppContent from './components/Sidebar/AppContent/AppContent';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
