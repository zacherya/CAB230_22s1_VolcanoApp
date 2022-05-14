import './App.css';

import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import NavbarComponent from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import RouteProtected from './helpers/RouteProtected';
import { AuthConsumer } from './services/AuthProvider'

import Home from './views/Home';
import Volcanoes from './views/Volcanoes';
import About from './views/About';
import Login from './views/Login';
import Register from './views/Register';
import DynamicError from './views/DynamicError';


function App() {
  return (
    <AuthConsumer>
     {({ authenticated, loginModalStatus,loginModalTrigger,registerModalStatus,registerModalTrigger }) => (
       <div className="App">
        <NavbarComponent />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route exact path="/Volcanos" element={<Volcanoes />}/>
          <Route path="/Volcanoes/:id" element={<Volcanoes />} />
          <Route path="/About" element={<About />} />
          {/* <Route element={<DynamicError />} /> */}
        </Routes>
        {!authenticated ? (<Login show={loginModalStatus} onHide={()=>loginModalTrigger()} />):(null)}
        {!authenticated ? (<Register show={registerModalStatus} onHide={()=>registerModalTrigger()} />):(null)}
        
      </div>
     )}
    </AuthConsumer>
  );
}

export default App;
