import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { addZaposlenik } from "../services/zaposlenikService";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  // const [users, setUsers] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Lozinke se ne podudaraju!");
    }
    try {
      setError("");
      setLoading(true);
      const u = await signup(emailRef.current.value, passwordRef.current.value);
      console.log(u.user.uid);
      // const email = emailRef.current.value;
      // setTimeout(() => {}, 1000);
      let userDb = {
        firebaseId: u.user.uid,
        ime: "Jasmin",
        prezime: "Alimanovic",
        email: emailRef.current.value,
        telefon: "4232343",
        ulogaId: 1,
      };
      console.log(userDb);
      await addZaposlenik(userDb);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (err) {
      setError("err");
      console.log(err);
    }
    setLoading(false);
  }

  //console.log(users);
  return (
    <Container
      className="d-flex align-items-center justify-content-center w-100 h-100"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div>
        <Card style={{ minWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
