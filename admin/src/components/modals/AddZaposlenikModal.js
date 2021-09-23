import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { addUserToFirebase } from "../../services/userService";
import { addZaposlenik } from "../../services/zaposlenikService";
import { getulogas } from "../../services/ulogaService";

export default function AddZaposlenikModal({ setAddedUser, ...props }) {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const emailRef = useRef();
  const ulogaRef = useRef();
  const passwordRef = useRef();
  const telefonRef = useRef();
  const [error, setError] = useState(null);
  const [uloge, setUloge] = useState(null);

  useEffect(() => {
    getulogas().then((data) => setUloge(data));
  }, []);

  function validateForm() {
    return (
      imeRef.current.value !== "" &&
      prezimeRef.current.value !== "" &&
      emailRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      telefonRef.current.value !== ""
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (validateForm()) {
      const user = {
        email: emailRef.current.value,
        telefon: telefonRef.current.value,
        password: passwordRef.current.value,
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
      };
      addUserToFirebase(user)
        .then((data) => {
          addZaposlenik({
            firebaseId: data.data.uid,
            email: emailRef.current.value,
            telefon: telefonRef.current.value,
            ime: imeRef.current.value,
            prezime: prezimeRef.current.value,
            ulogaId: ulogaRef.current.value,
          })
            .then((dbUser) => {
              setAddedUser(dbUser.data);
              Swal.fire(
                "Uspješno dodano",
                `Uspješno ste dodali zaposlenika <strong>
                ${dbUser.data.ime} ${dbUser.data.prezime}.</strong></br></br>
                Molimo vas da zapišete lozinku <strong> ${passwordRef.current.value}</strong>`,
                "success"
              ).then((res) => {
                if (res.isConfirmed) props.onHide();
              });
            })
            .catch((er) => console.error("err", er));
        })
        .catch((e) => console.error(e));
    } else {
      setError("Polja sa * su obavezna. Molim popunite ih.");
    }
  }

  function generatePassword() {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!#$&@?*";
    let chars = letters + numbers + symbols;
    let password = "";
    for (let i = 0; i < 8; i++) {
      let rand = Math.random() * chars.length;
      password += chars.charAt(rand);
    }
    passwordRef.current.value = password;
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
        <Form.Group className="my-2">
          <Form.Label>Email*</Form.Label>
          <Form.Control type="email" ref={emailRef} />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Lozinka*</Form.Label>
          <Form.Control readOnly ref={passwordRef} />
          <Button onClick={generatePassword} className="my-3">
            Generiši lozinku
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>Uloga</Form.Label>
          <select
            className="form-select"
            ref={ulogaRef}
            aria-label="Default select example"
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
        <Form.Group className="my-2">
          <Form.Label>Telefon*</Form.Label>
          <Form.Control ref={telefonRef} />
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
