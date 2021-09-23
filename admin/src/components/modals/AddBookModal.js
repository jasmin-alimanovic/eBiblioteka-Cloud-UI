import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getizdavace } from "../../services/izdavacService";
import { getautors } from "../../services/autorService";
import { getjezike } from "../../services/jezikService";
import { getkategorijas } from "../../services/kategorijaService";
import { addBook } from "../../services/bookService";
import { ProgressBar } from "../ProgressBar";
import Swal from "sweetalert2";

export default function AddBookModal({ setAddedBook, ...props }) {
  const nazivRef = useRef();
  const jezikRef = useRef();
  const isbnRef = useRef();
  const gdnRef = useRef();
  const opisRef = useRef();
  const autorRef = useRef();
  const izdanjeRef = useRef();
  const izdavacRef = useRef();
  const pismoRef = useRef();
  const kategorijaRef = useRef();
  const kolicinaRef = useRef();
  const [file, setFile] = useState(null);
  const types = ["image/png", "image/jpeg"];
  const [izdavaci, setIzdavaci] = useState([]);
  const [jezici, setJezici] = useState([]);
  const [autori, setAutori] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [photo, setPhoto] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      if (file) {
        setPhoto(file);
        setError(null);
      }
    }
  }
  function validateForm() {
    if (nazivRef.current.value === "") {
      setError("Unesite naziv knjige");
      return false;
    }
    if (isbnRef.current.value === "") {
      setError("Unesite ISBN knjige");
      return false;
    }
    if (opisRef.current.value === "") {
      setError("Unesite opis knjige");
      return false;
    }
    if (izdavacRef.current.value === "") {
      setError("Unesite izdavača knjige");
      return false;
    }
    if (autorRef.current.value === "") {
      setError("Unesite autora knjige");
      return false;
    }
    if (kategorijaRef.current.value === "") {
      setError("Unesite kategoriju knjige");
      return false;
    }
    if (pismoRef.current.value === "") {
      setError("Unesite pismo knjige");
      return false;
    }
    if (file == null) {
      setError("Dodajte fotografiju knjige");
      return false;
    }
    return true;
  }
  useEffect(() => {
    setLoading(true);
    getizdavace().then((data) => {
      setIzdavaci(data);
      setLoading(false);
    });
    setLoading(true);

    getautors().then((data) => {
      setAutori(data);
      setLoading(false);
    });
    setLoading(true);

    getjezike().then((data) => {
      setJezici(data);
      setLoading(false);
    });
    setLoading(true);
    getkategorijas().then((data) => {
      setKategorije(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (validateForm) {
      if (url) {
        const book = {
          naziv: nazivRef.current.value,
          isbn: isbnRef.current.value,
          godinaIzdavanja: gdnRef.current.value,
          opis: opisRef.current.value,
          imageUrl: url,
          pdfUrl: "pdf url",
          izdanje: izdanjeRef.current.value,
          pismo: pismoRef.current.value,
          autorId: autorRef.current.value,
          ukupno: kolicinaRef.current.value,
          izdavacId: izdavacRef.current.value,
          jezikId: jezikRef.current.value,
          kategorijaId: kategorijaRef.current.value,
        };
        addBook(book).then((res) => {
          setAddedBook(res.data);
          nazivRef.current.value = "";
          isbnRef.current.value = "";
          opisRef.current.value = "";
          gdnRef.current.value = null;
          autorRef.current.value = null;
          izdavacRef.current.value = null;
          jezikRef.current.value = null;
          kategorijaRef.current.value = null;
          setUrl(null);
          setFile(null);
          setPhoto(null);
          izdanjeRef.current.value = null;
          Swal.fire(
            "Uspješno dodano",
            `Uspješno ste dodali knjigu ${book.naziv}`,
            "success"
          ).then((res) => {
            if (res.isConfirmed) props.onHide();
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAddedBook, url]);

  function handlePhoto(e) {
    const files = e.target.files[0];
    setError(null);
    if (!types.includes(files.type)) {
      setError("Odaberite sliku formata .jpg ili .png!");
      return;
    }
    setFile(files);
  }
  if (loading) return <div>Loading..</div>;
  else
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        fullscreen="true"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Dodaj knjigu
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
              <Form.Control required ref={nazivRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>ISBN</Form.Label>
              <Form.Control required ref={isbnRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Godina izdavanja</Form.Label>
              <Form.Control required ref={gdnRef} type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opis</Form.Label>
              <textarea
                required
                className="form-control"
                rows="6"
                placeholder="Unesite opis knjige..."
                ref={opisRef}
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Label>Količina</Form.Label>
              <Form.Control required ref={kolicinaRef} type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Group>
                <Form.Label>Dodajte sliku knjige</Form.Label>
                <Form.Control type="file" onChange={handlePhoto} />
                {photo && (
                  <ProgressBar
                    photo={photo}
                    setPhoto={setPhoto}
                    name={isbnRef.current.value}
                    setUrl={setUrl}
                  />
                )}
              </Form.Group>
              <Form.Label>Autor</Form.Label>
              <select
                required
                id="autori"
                ref={autorRef}
                className="form-select"
              >
                <option disabled value="">
                  Izaberite autora
                </option>
                {autori?.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.ime + " " + autor.prezime}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Izdanje</Form.Label>
              <Form.Control required ref={izdanjeRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pismo</Form.Label>
              <select required className="form-select" ref={pismoRef}>
                <option disabled>Izaberite pismo</option>
                <option>Latinica</option>
                <option>Ćirilica</option>
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Izdavac</Form.Label>
              <select required className="form-select" ref={izdavacRef}>
                <option disabled>Izaberite izdavaca</option>
                {izdavaci.data?.map((izdavac) => (
                  <option key={izdavac.id} value={izdavac.id}>
                    {izdavac.naziv}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Jezik</Form.Label>
              <select required className="form-select" ref={jezikRef}>
                <option disabled>Izaberite Jezik</option>
                {jezici?.map((jezik) => (
                  <option key={jezik.id} value={jezik.id}>
                    {jezik.naziv}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Kategorija</Form.Label>
              <select required className="form-select" ref={kategorijaRef}>
                <option disabled>Izaberite kategoriju</option>
                {kategorije?.map((kategorija) => (
                  <option key={kategorija.id} value={kategorija.id}>
                    {kategorija.naziv}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} type="submit">
            Dodaj
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
