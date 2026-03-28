import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Verification from './Verification'; // Check this file name!
import Loading from './Loading';
import OTPPage from './OTPPage';

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