import "./App.css";

import React, { useState, useEffect } from "react";
import NavbarComponent from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthConsumer } from "./services/AuthProvider";

import Home from "./views/Home";
import Volcanoes from "./views/Volcanoes";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";
import DynamicError from "./views/DynamicError";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthConsumer>
      {({
        authenticated,
        loginModalStatus,
        loginModalTrigger,
        registerModalStatus,
        registerModalTrigger,
      }) => (
        <div className="App">
          <NavbarComponent />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route exact path="/Volcanoes" element={<Volcanoes />} />
            <Route path="/Volcanoes/:id" element={<Volcanoes />} />
            <Route path="/About" element={<About />} />
            <Route path="*" element={<DynamicError error="404" />} />
          </Routes>
          {!authenticated ? (
            <Login show={loginModalStatus} onHide={() => loginModalTrigger()} />
          ) : null}
          {!authenticated ? (
            <Register
              show={registerModalStatus}
              onHide={() => registerModalTrigger()}
            />
          ) : null}
          <ToastContainer />
        </div>
      )}
    </AuthConsumer>
  );
}

export default App;
