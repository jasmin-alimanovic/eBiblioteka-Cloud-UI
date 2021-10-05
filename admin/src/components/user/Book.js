import React from "react";
import { Card } from "react-bootstrap";
export default function Book({ book, onClick }) {
  return (
    <Card onClick={onClick} className="d-flex flex-row book-card">
      <Card.Img
        className="card-img-custom mb-2"
        height="190"
        width="122"
        style={{ borderRadius: "15px" }}
        src={book.imageUrl}
      />
      <Card.Body style={{ width: "50%" }}>
        <Card.Title>
          <strong>{book.naziv}</strong>
        </Card.Title>
        <Card.Subtitle>
          <p className="small">
            Pisac: {book.autor?.ime} {book.autor?.prezime}
          </p>
          <p className="small">ISBN: {book.isbn}</p>
          <p className="small">Izdavač: {book.izdavac?.naziv}</p>
          <p className="small">Dostupno: {book.dostupno}</p>
          <p className="small">Žanr: {book.kategorija?.naziv}</p>
        </Card.Subtitle>
      </Card.Body>
      <Card.Body style={{ width: "300px" }} className="small">
        Opis:{" "}
        <p className="book-opis" style={{ display: "block" }}>
          {" "}
          {book.opis}
        </p>
      </Card.Body>
    </Card>
  );
}
