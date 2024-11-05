import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './iconLibrary';
import './api/axiosDefaults';

import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import MainContent from './components/MainContent';
import SignUpForm from './pages/auth/SignUpForm';



function App() {
  return (
  <div className={styles.appBackground}>
    <div className={styles.appDiv}>
      <NavBar />
        <Container className={styles.app}>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
      </Container>
       <MainContent />
       </div>
  </div>
  );
}

export default App;
