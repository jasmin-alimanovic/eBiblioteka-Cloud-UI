import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { addizdavac } from "../../services/izdavacService";

export default function AddIzdavacModal({ setAddedUser, ...props }) {
  const nazivRef = useRef();
  const sjedisteRef = useRef();
  const [error, setError] = useState(null);

  function validateForm() {
    return nazivRef.current.value !== "" && sjedisteRef.current.value !== "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (validateForm()) {
      const user = {
        naziv: nazivRef.current.value,
        sjediste: sjedisteRef.current.value,
      };
      addizdavac(user)
        .then((dbUser) => {
          setAddedUser(dbUser);
          Swal.fire(
            "Uspješno dodano",
            `Uspješno ste dodali izdavača 
              <strong>${dbUser.data.naziv}.</strong>
              </br></br>`,
            "success"
          ).then((res) => {
            if (res.isConfirmed) props.onHide();
          });
        })
        .catch((er) => console.error("err", er));
    } else {
      setError("Polja sa * su obavezna. Molim popunite ih.");
    }
  }

  return (
    <Modal {...props}>
      <Modal.Header>Dodaj izdavača</Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Naziv*</Form.Label>
          <Form.Control ref={nazivRef} />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Sjedište*</Form.Label>
          <Form.Control ref={sjedisteRef} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer className="mt-4">
        <Button type="submit" onClick={handleSubmit}>
          Dodaj
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            props.onHide();
          }}
        >
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
