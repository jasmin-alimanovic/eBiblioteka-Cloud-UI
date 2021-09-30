import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import lockIcon from "../assets/img/lock.svg";

import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState(null);

  async function sendResetLink(e) {
    setError(null);
    e.preventDefault();
    console.log(email);
    try {
      await resetPassword(email);
      setEmail("");
      Swal.fire(
        "",
        "<b>Link je poslan na email. Otvorite link na emailu i unesite novu lozinku.</b>",
        "success"
      );
    } catch (e) {
      console.error(e);
      setError("Netačan email.");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "400px" }}>
        <Card.Body
          style={{ width: "400px" }}
          className="d-flex flex-column align-items-center"
        >
          <Image height="96" width="96" src={lockIcon} alt="lock icon" />
          <h4>Problemi sa prijavom?</h4>
          <Form className="d-flex justify-content-center align-items-center flex-column">
            <Form.Group className="mt-3" style={{ width: "70%" }}>
              <Form.Label
                style={{
                  wordBreak: "break-words",
                  fontSize: "14px",
                  color: "#8e8e8e",
                  textAlign: "center",
                }}
              >
                Unesite vašu email adresu i poslat ćemo Vam link za ponovno
                postavljanje lozinke
              </Form.Label>
            </Form.Group>
            <Form.Group className="mt-3" style={{ width: "70%" }}>
              <Form.Label>Unesite email:</Form.Label>
              <Form.Control
                placeholder="Unesite email za resetovanje lozinke"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {error && (
              <Alert
                style={{
                  width: "70%",
                  padding: "0.5rem",
                  textAlign: "center",
                }}
                variant="danger"
              >
                {error}
              </Alert>
            )}
            <Form.Group className="mt-3" style={{ width: "70%" }}>
              <Button
                type="submit"
                className="w-100"
                disabled={email === ""}
                onClick={sendResetLink}
              >
                Pošalji link za prijavu
              </Button>
            </Form.Group>
            <hr style={{ width: "0%" }} />
            <hr style={{ width: "70%" }} />
            <hr style={{ width: "0%" }} />
            <Form.Group style={{ width: "100%" }}>
              <Button
                onClick={() => {
                  window.history.back();
                }}
                variant="light"
                className="w-100"
              >
                Vrati se na prijavu
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
