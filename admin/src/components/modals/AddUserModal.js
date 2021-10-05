import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { addUser, addUserToFirebase } from "../../services/userService";
import CopyIcon from "../../assets/img/copy.svg";

export default function AddUserModal({ setAddedUser, ...props }) {
  const imeRef = useRef();
  const prezimeRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const adresaRef = useRef();
  const telefonRef = useRef();
  const [error, setError] = useState(null);

  function validateForm() {
    return (
      imeRef.current.value !== "" &&
      prezimeRef.current.value !== "" &&
      emailRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      adresaRef.current.value !== "" &&
      telefonRef.current.value !== ""
    );
  }

  function CopyToClipboard(ref) {
    ref.current.select();
    ref.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(ref.current.value);
  }
  document?.getElementById("copy-img")?.addEventListener("click", () => {
    CopyToClipboard(passwordRef);
  });

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
          addUser({
            firebaseId: data.data.uid,
            email: emailRef.current.value,
            telefon: telefonRef.current.value,
            korisnickoIme: usernameRef.current.value,
            ime: imeRef.current.value,
            prezime: prezimeRef.current.value,
            adresa: adresaRef.current.value,
            isUclanjen: true,
          })
            .then((dbUser) => {
              setAddedUser(dbUser.data);
              Swal.fire(
                "Uspješno dodano",
                `Uspješno ste dodali korisnika <strong>
                ${dbUser.data.ime} ${dbUser.data.prezime}.</strong></br></br>
                <span>Molimo vas da zapišete lozinku
                <strong> ${passwordRef.current.value}</strong>
                <img title="Kopiraj u međuspremnik" style="cursor:pointer;" id="copy-img" src="${CopyIcon}"" alt="copy icon" />
                </span>`,
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
    const symbols = "#$&@";
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
      <Modal.Header>Dodaj korisnika</Modal.Header>
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
          <Form.Label>Korisničko ime*</Form.Label>
          <Form.Control ref={usernameRef} />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Lozinka*</Form.Label>
          <Form.Control readOnly ref={passwordRef} />
          <Button onClick={generatePassword} className="my-3">
            Generiši lozinku
          </Button>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Adresa*</Form.Label>
          <Form.Control ref={adresaRef} />
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
