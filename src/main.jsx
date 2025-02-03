import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import FAQApp from './FAQApp.jsx';
import AdminFAQBoard from './AdminFAQBoard.jsx';
import Navbar from './Navbar.jsx';
import LoginPage from './Loginpage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Define route for Admin FAQ Board */}
        <Route path="/admin" element={<AdminFAQBoard />} />

        {/* Define route for FAQ App */}
        <Route path="/" element={<FAQApp />} />
        
        {/* Optionally, add a route for your main app (if required) */}
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
