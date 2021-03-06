import React, { useRef, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updatekategorija } from "../../services/kategorijaService";
import Swal from "sweetalert2";

export default function EditZanrModal({ setAddedUser, user, ...props }) {
  const nazivRef = useRef();
  const [error, setError] = useState(null);
  function validateForm() {
    if (nazivRef.current.value === "") {
      setError("Unesite ime");
      return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const userDb = {
        naziv: nazivRef.current.value,
      };
      updatekategorija(user.id, userDb).then((res) => {
        setAddedUser(res.data);
        Swal.fire(
          "Uspješno uređeno",
          `Uspješno ste uredili žanr ${user.naziv}`,
          "success"
        ).then((res) => {
          if (res.isConfirmed) props.onHide();
        });
        // props.onHide();
      });
    }
  }
  return (
    user && (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Uredi žanr
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            style={{ width: "70%", margin: "auto" }}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label>Naziv</Form.Label>
              <Form.Control defaultValue={user?.naziv} ref={nazivRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} type="submit">
            Uredi
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
