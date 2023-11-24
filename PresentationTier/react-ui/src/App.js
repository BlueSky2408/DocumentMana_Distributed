import './App.css';
// import Footers from './pages/Footers';
import Home from './components/Mainpage';
import LoginContainers from './components/Login';
import RegisterContainer from './components/Register';
import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/protectedRoute';
// import { AuthProvider } from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import login from './reducers/login'

function App() {
  return (
    <>
      <ToastContainer />
      <Box style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute component={Home} isAuthenticated={login} />} />
            <Route path="/login" element={<LoginContainers />} />
            <Route path="/register" element={<RegisterContainer />} />
            <Route path="/home" element={<ProtectedRoute component={Home} isAuthenticated={login} />} />

            {/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginContainers />} />
            <Route path="/home" element={<Home />} /> */}
          </Routes>
          {/* <Footers /> */}
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
