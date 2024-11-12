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
import CitiesPage from './pages/city/CitiesPage';
import CityProfilePage from './pages/city/CityProfilePage';
import ClubsPage from './pages/club/ClubsPage';
import ClubProfilePage from './pages/club/ClubProfilePage';
import EventsPage from './pages/event/EventsPage';
import EventProfilePage from './pages/event/EventProfilePage';



function App() {

  const location = useLocation();
  
  const showMainContent = ['/', '/login', '/signup'].includes(location.pathname);

  
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
                <Route path="/cities" element={<CitiesPage />} />
                <Route path="/cities/:id" element={<CityProfilePage />} />
                <Route path="/clubs" element={<ClubsPage />} />
                <Route path="/clubs/:id" element={<ClubProfilePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventProfilePage />} />
              </Routes>
            </Container>
            {showMainContent && <MainContent />}
          </div>
        </div>

  );
}

export default App;
