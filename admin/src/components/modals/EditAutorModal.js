import React, { useRef, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateautor } from "../../services/autorService";
import Swal from "sweetalert2";

export default function EditAutorModal({ setAddedUser, user, ...props }) {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const [error, setError] = useState(null);
  function validateForm() {
    if (imeRef.current.value === "") {
      setError("Unesite ime");
      return false;
    }
    if (imeRef.current.value === "") {
      setError("Unesite prezime");
      return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const userDb = {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
      };
      updateautor(user.id, userDb).then((res) => {
        setAddedUser(res.data);
        Swal.fire(
          "Uspješno uređeno",
          `Uspješno ste uredili autora ${user.ime} ${user.prezime}`,
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
            Uredi autora
          </Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            style={{ width: "70%", margin: "auto" }}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label>Ime</Form.Label>
              <Form.Control defaultValue={user?.ime} ref={imeRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                defaultValue={user?.prezime}
                className="form-control"
                ref={prezimeRef}
              ></Form.Control>
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
