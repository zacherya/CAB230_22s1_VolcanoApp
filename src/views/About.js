import React from "react";
import DataService from "../services/DataRequestService";
import { AuthConsumer } from "../services/AuthProvider";
import Endpoints from "../helpers/Endpoints";
import { Container } from "react-bootstrap";
import { Grid } from "react-bootstrap-icons";

function About() {
  return (
    <Container className="py-3">
      <h1>About this assignment</h1>
      <hr></hr>
      <p>
        <b>Developed by:</b> Zachery Adams (n10772693)
      </p>
      <p>
        <b>University:</b> Queensland University of Technology, Brisbane,
        Australia
      </p>
      <p>
        <b>Developed for unit:</b> CAB230 - Web Application Development
      </p>
      <p>
        <b>Development approach:</b> Agile development using GitHub
      </p>
    </Container>
  );
}

export default About;
