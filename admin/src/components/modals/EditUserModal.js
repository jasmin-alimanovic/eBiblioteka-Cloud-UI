import React, { useRef, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateUser } from "../../services/userService";
import Swal from "sweetalert2";

export default function EditUserModal({ setAddedUser, user, ...props }) {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const usernameRef = useRef();
  const telefonRef = useRef();
  const adresaRef = useRef();
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
    if (usernameRef.current.value === "") {
      setError("Unesite korisničko ime");
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
        korisnickoIme: usernameRef.current.value,
        telefon: telefonRef.current.value,
        adresa: adresaRef.current.value,
        firebaseId: user.firebaseId,
      };
      updateUser(user.id, userDb).then((res) => {
        setAddedUser(res.data);
        Swal.fire(
          "Uspješno uređeno",
          `Uspješno ste uredili korisnika ${user.ime} ${user.prezime}`,
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
            Uredi korisnika
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
            <Form.Group>
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                defaultValue={user.korisnickoIme}
                ref={usernameRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefon</Form.Label>
              <Form.Control defaultValue={user.telefon} ref={telefonRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresa</Form.Label>
              <Form.Control defaultValue={user.adresa} ref={adresaRef} />
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
