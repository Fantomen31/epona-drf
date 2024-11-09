import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './iconLibrary';
import './api/axiosDefaults';

import { Route, Routes, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import MainContent from './components/MainContent';
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import HomePage from './components/HomePage';

import ProfilePage from './pages/profile/ProfilePage';



function App() {

  const location = useLocation();
  
  const showMainContent = !['/profiles'].some(path => location.pathname.startsWith(path));

  
  
  return (

        <div className={styles.appBackground}>
          <div className={styles.appDiv}>
            <NavBar />
            <Container className={styles.app}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/profiles/:id" element={<ProfilePage />} />
              </Routes>
            </Container>
            {showMainContent && <MainContent />}
          </div>
        </div>

  );
}

export default App;
