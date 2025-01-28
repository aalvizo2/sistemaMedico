import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import AppContent from './components/Sidebar/AppContent/AppContent';
import { PacienteProvider } from './context/DashboardContext';

const App: React.FC = () => {
  return (
    <PacienteProvider>
       <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </PacienteProvider>
   
  );
};

export default App;
