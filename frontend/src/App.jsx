import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import ClientList from './pages/ClientList';
import ClientDetail from './pages/ClientDetail';
import RSEPanel from './pages/RSEPanel';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/:id" element={<ClientDetail />} />
          <Route path="rse" element={<RSEPanel />} />
          <Route path="admin" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
