import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

export default function BookModal({ book, ...props }) {
  
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
          {book.naziv}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body scrollable="true">
        <Card style={{ width: "70%", margin: "auto", borderRadius: "15px" }}>
          <Card.Title>
            {" "}
            <Card.Img width="400" height="200" src={book.imageUrl} />
          </Card.Title>
          <Card.Body>
            <p>
              <strong>Pisac</strong>: {book.autor.ime} {book.autor.prezime}
            </p>
            <p>ISBN: {book.isbn}</p>
            <p>Godina izdavanja: {book.godinaIzdavanja}</p>
            <p>Izdavač: {book.izdavac.naziv}</p>
            <p>Dostupno: {book.dostupno}</p>
            <p>Žanr: {book.kategorija.naziv}</p>
            <p>Jezik: {book.jezik.naziv}</p>
            <p>Pismo: {book.pismo}</p>
            <p>Izdanje: {book.izdanje}</p>

            <p className="w-100" style={{ display: "block" }}>
              Opis:<em> {book.opis}</em>
            </p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
