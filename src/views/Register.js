import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { AuthConsumer } from "../services/AuthProvider";

function Register(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  let submitBtn = useRef(null);

  useEffect(() => {
    setFormValid(checkFormValidity());
    setEmailValid(checkEmailValidity());
    setPasswordsMatch(checkPasswordsMatch());
  }, [email, firstPassword, secondPassword]);

  function checkPasswordsMatch() {
    if (firstPassword !== "" && secondPassword === "") return true;
    if (firstPassword === secondPassword) return true;
    return false;
  }

  function checkEmailValidity() {
    if (email === "") return true;
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function checkFormValidity() {
    var valid = true;
    if (firstPassword === "" || secondPassword === "") return false;
    if (email === "") return false;
    if (!checkEmailValidity()) return false;
    return valid;
  }

  const triggerPasswordState = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyEvent = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitBtn.current.click();
    }
  };

  return (
    <AuthConsumer>
      {({ register, authenticated }) => (
        <Modal {...props}>
          <Modal.Header closeButton>
            <Modal.Title>Register for Volcanos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="john.smith@volcanos.com"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyEvent(e)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <InputGroup className="mb-3">
                    <Form.Control
                      id="formNewPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => setFirstPassword(e.target.value)}
                      onKeyPress={(e) => handleKeyEvent(e)}
                    />
                    <Form.Control
                      id="formNewPasswordConfirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      onChange={(e) => setSecondPassword(e.target.value)}
                      onKeyPress={(e) => handleKeyEvent(e)}
                    />
                    <Button
                      variant="outline-secondary"
                      id="togglePasswordVisibility"
                      onMouseDown={triggerPasswordState}
                      onMouseUp={triggerPasswordState}
                    >
                      {showPassword ? <EyeSlashFill /> : <EyeFill />}
                    </Button>
                  </InputGroup>
                </Col>
              </Form.Group>
              <div className="d-flex flex-column justify-content-center text-center px-5">
                {!emailValid ? <code>Email is invalid</code> : null}
                {!passwordsMatch ? <code>Passwords don't match</code> : null}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!checkPasswordsMatch() || !checkFormValidity()}
              variant="warning"
              ref={submitBtn}
              onClick={() => register(email, firstPassword)}
            >
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </AuthConsumer>
  );
}

export default Register;
