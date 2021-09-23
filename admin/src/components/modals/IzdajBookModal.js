import React, { useRef, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getUsers, getUserById } from "../../services/userService";
import { addZaduzba } from "../../services/zaduzbaService";
import { updateBook } from "../../services/bookService";
import Swal from "sweetalert2";

export default function IzdajBookModal(props) {
  const userRef = useRef();
  const { book } = props;
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getUsers("id_desc", query, 1, 10).then((data) => {
      setUsers(data.data);
    });
  }, [query, book]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let korisnikId = parseInt(userRef.current.value);
      const _book = {
        ...book,
        dostupno: book.dostupno - 1,
        kategorijaId: book.kategorija.id,
        izdavacId: book.izdavac.id,
        jezikId: book.jezik.id,
        autorId: book.autor.id,
      };
      delete _book.izdavac;
      delete _book.godinaIzdavanja;
      delete _book.jezik;
      delete _book.kategorija;
      delete _book.knjigaZanr;
      delete _book.autor;
      const user = await getUserById(korisnikId);

      await updateBook(book.id, _book);
      let knjigaId = book.id;
      await addZaduzba({ korisnikId, knjigaId });
      Swal.fire(
        "Uspješno zaužena knjiga",
        `Uspješno ste iznajmili knjigu ${book.naziv} korisniku ${user.ime} ${user.prezime}`,
        "success"
      ).then((res) => {
        if (res.isConfirmed) props.onHide();
      });
    } catch (err) {
      Swal.fire("Error", `Unesite korisnika`, "error").then((res) => res);
    }
  }

  return (
    <>
      <Modal {...props}>
        <Modal.Header>
          <h2>Izdaj knjigu {book?.naziv}</h2>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Knjiga: </Form.Label>
              <Form.Control readOnly value={book?.naziv} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Korisnik</Form.Label>
              <Form.Control
                placeholder="Pretražite po id-u, imenu, prezimenu..."
                ref={userRef}
                onChange={() => {
                  setQuery(userRef.current.value);
                }}
                list="users"
              />
              <datalist id="users">
                {users ? (
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.id} | {user.ime + " " + user.prezime}
                    </option>
                  ))
                ) : (
                  <option disabled>No users</option>
                )}
              </datalist>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Izdaj</Button>
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
    </>
  );
}
