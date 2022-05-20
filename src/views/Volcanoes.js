import React, { useState, StrictMode } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
} from "react-router-dom";
import VolcanoList from "./VolcanoesList";
import VolcanoView from "./VolcanoView";

function Volcano() {
  const { id } = useParams();
  const timeout = { enter: 800, exit: 400 };
  const currentKey = "hello";

  return id === undefined ? <VolcanoList /> : <VolcanoView id={id} />;
}

export default Volcano;
