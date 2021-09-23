import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateZaposlenik } from "../../services/zaposlenikService";
import Swal from "sweetalert2";
import { getulogas } from "../../services/ulogaService";

export default function EditZaposlenikModal({ setAddedUser, user, ...props }) {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const telefonRef = useRef();
  const emailRef = useRef();
  const ulogaRef = useRef();
  const [error, setError] = useState(null);
  const [uloge, setUloge] = useState(null);
  function validateForm() {
    if (imeRef.current.value === "") {
      setError("Unesite ime");
      return false;
    }
    if (imeRef.current.value === "") {
      setError("Unesite prezime");
      return false;
    }
    if (emailRef.current.value === "") {
      setError("Unesite email");
      return false;
    }
    return true;
  }
  useEffect(() => {
    getulogas().then((data) => setUloge(data));
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const userDb = {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
        telefon: telefonRef.current.value,
        email: emailRef.current.value,
        firebaseId: user.firebaseId,
        ulogaId: parseInt(ulogaRef.current.value),
      };
      updateZaposlenik(user.id, userDb).then((res) => {
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
              <Form.Label>Email</Form.Label>
              <Form.Control defaultValue={user.email} ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Uloga</Form.Label>
              <select
                className="form-select"
                defaultValue={user.uloga.id}
                ref={ulogaRef}
              >
                <option disabled>Odaberite ulogu</option>
                {uloge &&
                  uloge.map((uloga) => (
                    <option key={uloga.id} value={uloga.id}>
                      {uloga.naziv}
                    </option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefon</Form.Label>
              <Form.Control defaultValue={user.telefon} ref={telefonRef} />
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
