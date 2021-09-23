import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { addjezik } from "../../services/jezikService";

export default function AddJezikModal({ setAddedUser, ...props }) {
  const nazivRef = useRef();
  const [error, setError] = useState(null);

  function validateForm() {
    return nazivRef.current.value !== "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (validateForm()) {
      const jezik = {
        naziv: nazivRef.current.value,
      };
      addjezik(jezik)
        .then((dbjezik) => {
          setAddedUser(dbjezik);
          Swal.fire(
            "Uspješno dodano",
            `Uspješno ste dodali jezik <strong>
                ${dbjezik.data.naziv} .</strong></br></br>`,
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
      <Modal.Header>Dodaj jezik</Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Naziv*</Form.Label>
          <Form.Control ref={nazivRef} />
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
