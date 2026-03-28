import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Verification from './Verification';
import Loading from './Loading';
import OTPPage from './OTPPage'; // Import the new file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/otp" element={<OTPPage />} />
      </Routes>
    </Router>
  );
}

export default App;