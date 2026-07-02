
import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import RegistrationWizard from './components/RegistrationWizard';
import DocumentRepositoryPage from './components/DocumentRepositoryPage';
import SupportPage from './components/SupportPage';
import AboutPage from './components/AboutPage';
import ProfilePage from './components/ProfilePage';
import ComplianceDashboard from './components/ComplianceDashboard';
import RoleManagementPage from './components/RoleManagementPage'; // Import RoleManagementPage
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { i18n } = useTranslation();
  const { isDark } = useTheme();

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleStartRegistration = () => {
    navigate('/wizard');
  };

  const handleShowDocumentRepository = () => {
    navigate('/document-repository');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-primary text-primary dark:bg-dark-primary dark:text-dark-primary font-sans`}>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <main className={"pt-20"}>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage onLoginSuccess={handleLogin} /> : <HomePage onStartRegistration={handleStartRegistration} onShowDocumentRepository={handleShowDocumentRepository} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/wizard" element={isAuthenticated ? <RegistrationWizard onBackToHome={handleBackToHome} /> : <Navigate to="/" />} />
          <Route path="/document-repository" element={isAuthenticated ? <DocumentRepositoryPage /> : <Navigate to="/" />} />
          <Route path="/support" element={isAuthenticated ? <SupportPage /> : <Navigate to="/" />} />
          <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="/compliance" element={isAuthenticated ? <ComplianceDashboard /> : <Navigate to="/" />} />
          <Route path="/role-management" element={isAuthenticated ? <RoleManagementPage /> : <Navigate to="/" />} /> {/* Add new route for RoleManagementPage */}
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
