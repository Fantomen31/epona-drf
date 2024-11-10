import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './iconLibrary';
import './api/axiosDefaults';

import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import HomePage from './components/HomePage';

import ProfilePage from './pages/profile/ProfilePage';
import CitiesPage from './pages/city/CitiesPage';



function App() {

  
  
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
              </Routes>
            </Container>
          </div>
        </div>

  );
}

export default App;
