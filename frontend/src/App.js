import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import UserHomePage from "./Components/Pages/UserHomePage";
import AppContext from './Hooks/AppContext';
import { useState} from "react";

function App() {
  const [rows, setRows] = useState('');

  return (
    <AppContext.Provider value={{ rows, setRows }}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserHomePage />}/>
      </Routes>
    </Router>
    </AppContext.Provider>
  );
}

export default App;
