import React, { useRef, useState, useEffect } from "react";
import { Form, Image, Button, Alert } from "react-bootstrap";
import { updateZaposlenik } from "../services/zaposlenikService";
//local imports
import MenuComponent from "./Menu";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import editIcon from "../assets/img/edit.svg";
//
export default function Postavke() {
  const { currentUser, updatePassword } = useAuth();

  const imeRef = useRef();
  const prezimeRef = useRef();
  const emailRef = useRef();
  const ulogaRef = useRef();
  const telefonRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [btnEdit, setBtnEdit] = useState(true);
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [showChangePassField, setShowChangePassField] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //funkcija koja updatuje korisnika
  async function handleEdit(e) {
    e.preventDefault();
    setError(null);
    const ime = imeRef.current.innerHTML;
    const prezime = prezimeRef.current.innerHTML;
    const telefon = telefonRef.current.innerHTML;
    if (ime === "" || prezime === "" || telefon === "") {
      setError("Sva polja moraju biti popunjena!");
      return;
    }
    const user = {
      ime: imeRef.current.innerHTML,
      prezime: prezimeRef.current.innerHTML,
      emailRef: currentUser.email,
      telefon: telefonRef.current.innerHTML,
      ulogaId: currentUser.uloga.id,
      firebaseId: currentUser.firebaseId,
    };
    try {
      await updateZaposlenik(currentUser.id, user);
      setBtnEdit(true);
      Swal.fire(
        "Uspješno uređeno",
        "Uspješno ste uredili svoj profil",
        "success"
      );
    } catch (e) {
      console.error(e);
      setError("Popunite sva polja");
    }
  }

  //funkcija koja mijenja loziknu trenutnog korisnika
  async function PromijeniLozinku(e) {
    e.preventDefault();
    setError(null);
    const pass = passwordRef.current.value;
    const rPass = repeatPasswordRef.current.value;
    if (pass === "" || rPass === "") {
      setError("Oba polja moraju biti popunjena");
      return;
    }
    if (pass !== rPass) {
      setError("Lozinke moraju biti iste");
      return;
    }
    try {
      setLoading(true);
      await updatePassword(pass);
      setLoading(false);
      Swal.fire(
        "Uspješno promijenjena lozinka",
        "Uspješno ste promijenili lozinku",
        "success"
      );
      setShowChangePassField(false);

      setError(null);
      setTimeout(() => {
        setIsAnimate(false);
      }, 500);
    } catch (e) {
      setError("ERROR");
    }
  }

  useEffect(() => {
    document.title = "eBiblioteka Cloud-Postavke";
  }, []);

  return (
    <div className="d-flex w-100">
      <MenuComponent />
      <div className="push"></div>
      <main role="main" id="main" className="w-100 d-flex flex-column">
        <section
          className="my-5 mx-3 d-flex justify-content-between align-self-center me-5"
          style={{ marginBottom: "1rem !important", width: "50%" }}
        >
          <h1>
            <strong>Postavke</strong>
          </h1>
          <div className="user-detail d-flex">
            <span>
              | {currentUser?.ime}&nbsp; {currentUser?.prezime}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              <figure>
                <Image
                  height="30"
                  src={`https://eu.ui-avatars.com/api/?bold=true&name=${currentUser.ime}+${currentUser.prezime}&rounded=true&background=0af`}
                  alt=""
                />
              </figure>
            </span>
          </div>
        </section>
        <div
          id="books"
          className="ms-1 me-5 justify-self-center align-self-center"
          style={{ width: "50%" }}
        >
          <Form
            className="py-4 px-2 icon-show"
            style={{ transition: "all 350ms ease-in-out 2s" }}
          >
            <Form.Group className="d-flex justify-content-between mb-2">
              <Form.Label>Ime:&nbsp;&nbsp;&nbsp;</Form.Label>
              <Form.Label
                ref={imeRef}
                style={{ cursor: "text", width: "100%" }}
                contentEditable={true}
                onInput={() => setBtnEdit(false)}
                suppressContentEditableWarning={true}
              >
                {currentUser.ime}
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-2">
              <Form.Label>Prezime:&nbsp;&nbsp;&nbsp;</Form.Label>
              <Form.Label
                ref={prezimeRef}
                style={{ cursor: "text", width: "100%" }}
                contentEditable={true}
                onInput={() => setBtnEdit(false)}
                suppressContentEditableWarning={true}
              >
                {currentUser.prezime}
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-2">
              Email:&nbsp;&nbsp;&nbsp;
              <Form.Label
                ref={emailRef}
                style={{ cursor: "text", width: "100%" }}
              >
                {currentUser.email}
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-2">
              Uloga:&nbsp;&nbsp;&nbsp;
              <Form.Label
                ref={ulogaRef}
                style={{ cursor: "text", width: "100%" }}
              >
                {currentUser.uloga.naziv}
              </Form.Label>
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-2">
              Telefon:&nbsp;&nbsp;&nbsp;
              <Form.Label
                ref={telefonRef}
                style={{ cursor: "text", width: "100%" }}
                contentEditable={true}
                onInput={() => setBtnEdit(false)}
                suppressContentEditableWarning={true}
              >
                {currentUser.telefon}
              </Form.Label>
            </Form.Group>
            <Form.Group
              className="d-flex justify-content-between mb-2"
              onMouseEnter={() => setShowEditIcon(false)}
              onMouseLeave={() => setShowEditIcon(true)}
            >
              Lozinka:&nbsp;&nbsp;&nbsp;
              <Form.Label style={{ cursor: "text", width: "100%" }}>
                &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
                <img
                  style={{
                    cursor: "pointer",
                    marginLeft: ".5rem",
                    marginBottom: "5px",
                  }}
                  className={`${showEditIcon ? "icon-hide" : "icon-show"}`}
                  title="Promijeni lozinku"
                  height="20"
                  width="20"
                  onClick={() => {
                    setShowChangePassField(true);
                    setIsAnimate(true);
                  }}
                  src={editIcon}
                  alt="edit icon"
                />
              </Form.Label>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {/* new password field */}
            <Form.Group
              className={`flex-column justify-content-between  mb-2 ${
                showChangePassField ? "pass-animate" : "pass-remove-animate"
              }  ${isAnimate ? "pass-show" : "pass-hide"}`}
            >
              <Form.Row>
                <Form.Label>Nova lozinka:&nbsp;&nbsp;&nbsp;</Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type="password"
                  style={{ cursor: "text", width: "100%" }}
                />
                <Form.Label>Ponovi novu lozinku:&nbsp;&nbsp;&nbsp;</Form.Label>
                <Form.Control
                  ref={repeatPasswordRef}
                  type="password"
                  style={{ cursor: "text", width: "100%" }}
                />
              </Form.Row>
              <Form.Row className="mt-4">
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={(e) => PromijeniLozinku(e)}
                >
                  Promijeni lozinku
                </Button>
                <Button
                  onClick={() => {
                    setShowChangePassField(false);

                    setError(null);
                    setTimeout(() => {
                      setIsAnimate(false);
                    }, 500);
                  }}
                  variant="danger"
                >
                  Odustani
                </Button>
              </Form.Row>
            </Form.Group>

            {/* button save changes */}
            <Form.Group className="mt-4 d-flex justify-content-between">
              <Button
                hidden={btnEdit}
                onClick={(e) => handleEdit(e)}
                type="submit"
              >
                Spasi izmjene
              </Button>
              <Button
                variant="danger"
                hidden={btnEdit}
                onClick={(e) => {
                  e.preventDefault();
                  imeRef.current.innerHTML = currentUser.ime;
                  prezimeRef.current.innerHTML = currentUser.prezime;
                  telefonRef.current.innerHTML = currentUser.telefon;
                  setBtnEdit(true);
                  setError(null);
                }}
                type="submit"
              >
                Odustani
              </Button>
            </Form.Group>
          </Form>
        </div>
      </main>
    </div>
  );
}
