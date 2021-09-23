import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getizdavace } from "../../services/izdavacService";
import { getautors } from "../../services/autorService";
import { getjezike } from "../../services/jezikService";
import { getkategorijas } from "../../services/kategorijaService";
import { updateBook } from "../../services/bookService";
import Swal from "sweetalert2";

export default function EditBookModal({setAddedBook,book,  ...props}) {
  const nazivRef = useRef();
  const jezikRef = useRef();
  const opisRef = useRef();
  const autorRef = useRef();
  const izdavacRef = useRef();
  const kategorijaRef = useRef();
  const kolicinaRef = useRef();
  const [izdavaci, setIzdavaci] = useState([]);
  const [jezici, setJezici] = useState([]);
  const [autori, setAutori] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function validateForm() {
    if (nazivRef.current.value === "") {
      setError("Unesite naziv knjige");
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
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const bookDb = {
        naziv: nazivRef.current.value,
        opis: opisRef.current.value,
        pdfUrl: book.pdfUrl,
        imageUrl: book.imageUrl,
        dostupno: book.dostupno + parseInt(kolicinaRef.current.value),
        ukupno: book.ukupno + parseInt(kolicinaRef.current.value),
        autorId: autorRef.current.value,
        izdavacId: izdavacRef.current.value,
        jezikId: jezikRef.current.value,
        kategorijaId: kategorijaRef.current.value,
      };
      updateBook(book.id, bookDb).then((res) => {
        setAddedBook(res.data);
        nazivRef.current.value = null;
        opisRef.current.value = null;
        autorRef.current.value = null;
        izdavacRef.current.value = null;
        jezikRef.current.value = null;
        kategorijaRef.current.value = null;
        Swal.fire(
          "Uspješno uređeno",
          `Uspješno ste uredili knjigu ${book.naziv}`,
          "success"
        ).then((res) => {
          if (res.isConfirmed) props.onHide();
        });
        // props.onHide();
      });
    }
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

  if (loading) return <div>Loading..</div>;
  else
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Uredi knjigu
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
              <Form.Control defaultValue={book?.naziv} ref={nazivRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opis</Form.Label>
              <textarea
                defaultValue={book?.opis}
                className="form-control"
                rows="6"
                cols="30"
                ref={opisRef}
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Label>Dostupno</Form.Label>
              <Form.Control readOnly value={book?.dostupno} />
              <Form.Label>Ukupno</Form.Label>
              <Form.Control readOnly value={book?.ukupno} />
              <Form.Label>Unesite količinu</Form.Label>
              <Form.Control type="number" ref={kolicinaRef} defaultValue={0} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Autor</Form.Label>
              <select
                defaultValue={book?.autor.id}
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
              <Form.Label>Izdavac</Form.Label>
              <select
                defaultValue={book?.izdavac.id}
                className="form-select"
                ref={izdavacRef}
              >
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
              <select
                defaultValue={book?.jezik.id}
                className="form-select"
                ref={jezikRef}
              >
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
              <select
                defaultValue={book?.kategorija.id}
                className="form-select"
                ref={kategorijaRef}
              >
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
            Uredi
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
