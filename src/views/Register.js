import React, {useState,useEffect} from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function Register(props) {

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const [formValid, setFormValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    useEffect(() => {
        setFormValid(checkFormValidity());
        setPasswordsMatch(checkPasswordsMatch());
    }, [name,email,firstPassword,secondPassword]);

    function checkPasswordsMatch() {
        if(firstPassword !== "" && secondPassword === "") return true;
        if(firstPassword === secondPassword) return true;
        return false;
    }

    function checkFormValidity() {
        var valid = true;
        if(firstPassword === "" || secondPassword === "") return false;
        if(name === "") return false;
        if(email === "") return false;
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) return false;
        return valid;
    }

    const triggerPasswordState = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Login to Volcanos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                <Form.Label column sm="2">
                Full Name
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" placeholder="John Smith" onChange={(e) => setName(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" placeholder="john.smith@volcanos.com" onChange={(e) => setEmail(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="10">
                    <InputGroup className="mb-3">
                        <Form.Control id="formPassword" type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setFirstPassword(e.target.value)} />
                        <Form.Control id="formPasswordConfirm" type={showPassword ? "text" : "password"} placeholder="Confirm password" onChange={(e) => setSecondPassword(e.target.value)} />
                        <Button variant="outline-secondary" id="button-addon2" onClick={triggerPasswordState}>
                            {showPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                    </InputGroup>
                    {!passwordsMatch ? (<code>Passwords don't match</code>) : null}
                    
                </Col>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.onHide}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
    );
}

export default Register;