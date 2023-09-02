import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import UserHomePage from './Components/Pages/UserHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:user" element={<UserHomePage />}/>
      </Routes>
    </Router>
  );
}

export default App;