import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './iconLibrary';
import './api/axiosDefaults';

import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import MainContent from './components/MainContent';
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import HomePage from './components/HomePage';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.appBackground}>
          <div className={styles.appDiv}>
            <NavBar />
            <Container className={styles.app}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
              </Routes>
            </Container>
            <MainContent />
          </div>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
