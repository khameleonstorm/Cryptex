import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// importing pages
import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:page" element={<Dashboard />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
