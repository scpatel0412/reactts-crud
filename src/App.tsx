import React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import PageOne from './component/PageOne';
function App() {
  return (
    <div>
      <Router >
        <Routes>
          <Route path="/" element={<PageOne/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
