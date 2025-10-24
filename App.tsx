
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Queue from './pages/Queue';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Header from './components/Header';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { QueueProvider } from './hooks/useQueue';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <QueueProvider>
          <Main />
        </QueueProvider>
      </HashRouter>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user, pages } = useAuth();

  if (!user) {
    return <Login />;
  }
  
  return (
    <div className="min-h-screen bg-brand-gray-50">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <Routes>
          <Route path="/dashboard" element={<Dashboard pages={pages} />} />
          <Route path="/queue" element={<Queue pages={pages} />} />
          <Route path="/settings" element={<Settings pages={pages} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
