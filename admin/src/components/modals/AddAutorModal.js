import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { addautor } from "../../services/autorService";

export default function AddAutorModal({ setAddedUser, ...props }) {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const [error, setError] = useState(null);

  function validateForm() {
    return imeRef.current.value !== "" && prezimeRef.current.value !== "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (validateForm()) {
      const user = {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
      };
      addautor(user)
        .then((dbUser) => {
          setAddedUser(dbUser);
          Swal.fire(
            "Uspješno dodano",
            `Uspješno ste dodali autora <strong>
                ${dbUser.data.ime} ${dbUser.data.prezime}.</strong></br></br>`,
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
      <Modal.Header>Dodaj zaposlenika</Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Ime*</Form.Label>
          <Form.Control ref={imeRef} />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Prezime*</Form.Label>
          <Form.Control ref={prezimeRef} />
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
