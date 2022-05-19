import React, {useState, useRef} from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { AuthConsumer } from "../services/AuthProvider";

function Login(props) {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const triggerPasswordState = () => {
        setShowPassword(!showPassword);
    }

    let submitBtn = useRef(null);

    const handleKeyEvent = (e) => {
      if (e.key === "Enter") {
                          e.preventDefault();
                          console.log(submitBtn)
                          submitBtn.current.click();
                        }
    };

    return (
      <AuthConsumer>
        {({ login, authenticated }) => (
          
        <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Login to Volcanos</Modal.Title>
      </Modal.Header>
      <Modal.Body>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" placeholder="john.smith@volcanos.com" onChange={(e) => setEmail(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="10">
                <InputGroup className="mb-3">
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => handleKeyEvent(e)} />
                    <Button variant="outline-secondary" id="button-addon2" onClick={triggerPasswordState}>
                        {showPassword ? <EyeSlashFill /> : <EyeFill />}
                    </Button>
                </InputGroup>
                
                </Col>
            </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" ref={submitBtn} onClick={()=>login(email,password)}> {/*props.onHide*/}
          Login
        </Button>
      </Modal.Footer>
    </Modal>
        )}
    </AuthConsumer>
    );
}

export default Login;