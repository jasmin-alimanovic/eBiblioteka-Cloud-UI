import React, { useCallback, useEffect, useState } from "react";
import { Container, Image, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { getbooks } from "../../services/bookService";
import { getkategorijas } from "../../services/kategorijaService";
import { useHistory } from "react-router";
import Navigation from "./Navigation";
import Book from "./Book";
import { getUserByFID } from "../../services/userService";
import CustomHeader from "./CustomHeader";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/img/close.svg";
import DropdownSort from "./DropdownSort";
import BookModal from "../modals/BookModal";

export default function Knjige() {
  const bookRef = React.forwardRef(() => {});
  const { currentUser, logout } = useAuth();
  const [books, setBooks] = useState(null);
  const [kategorije, setKategorije] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("id_desc");
  const [kategorija, setKategorija] = useState(null);
  const [activeSort, setActiveSort] = useState(1);
  const [viewBook, setViewBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const zaduzene = queryParams.get("zaduzene");
  const history = useHistory();

  const getZaduzeneKnjige = useCallback(() => {
    getUserByFID(currentUser.firebaseId).then((data) => {
      setBooks({
        data: data?.zaduzbe?.map((z) => z.knjiga),
        count: currentUser.zaduzbe.length,
        next: null,
        previous: null,
      });
    });
  }, [currentUser?.firebaseId, currentUser?.zaduzbe?.length]);

  useEffect(() => {
    console.log(currentUser);
    if (zaduzene) {
      getZaduzeneKnjige();
    } else
      getbooks(sort, query, page, pageSize, kategorija).then((data) => {
        setBooks(data);
      });
  }, [
    page,
    pageSize,
    query,
    sort,
    kategorija,
    zaduzene,
    getZaduzeneKnjige,
    currentUser,
  ]);

  useEffect(() => {
    if (zaduzene) {
      getZaduzeneKnjige();
    } else {
      getbooks("id_desc", "", 1, 5).then((data) => {
        setBooks(data);
      });
    }

    getkategorijas().then((k) => {
      setKategorije(k);
    });
  }, [getZaduzeneKnjige, zaduzene]);

  return (
    <>
      <Navigation getZaduzeneKnjige={getZaduzeneKnjige} logout={logout} />

      <Container className="d-flex flex-column justify-content-center align-items-center">
        <div style={{ height: "170px", minHeight: "170px" }}></div>
        <Card
          role="main"
          className="main-user p-4"
          style={{ width: "60%", minHeight: "100%" }}
        >
          <div>
            <div style={{ height: "70px" }}></div>
            <CustomHeader setQuery={setQuery} currentUser={currentUser} />
          </div>
          <div className="main mt-5 d-flex">
            <div className="left" style={{ width: "20%" }}>
              <DropdownSort
                setActiveSort={setActiveSort}
                activeSort={activeSort}
                setSort={setSort}
              />
              <br />
              <ul>
                Žanrovi
                {kategorije?.map((k) => (
                  <li key={k.id} className="arrow">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setKategorija(k.id);
                        history.replace("/knjige");
                        setPage(1);
                      }}
                      // className="nav-link"
                      to={"/knjige#"}
                    >
                      {k.naziv}{" "}
                    </Link>
                  </li>
                ))}
                {kategorija && (
                  <li
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setKategorija(null);
                      setPage(1);
                    }}
                  >
                    <Image src={CloseIcon} /> Obriši filter
                  </li>
                )}
              </ul>
            </div>
            <div className="middle" style={{ width: "80%" }}>
              {books
                ? books.data.map((book) => (
                    <Book
                      onClick={() => {
                        setViewBook(book);
                        setShowBookModal(true);
                      }}
                      book={book}
                      key={book.id}
                    />
                  ))
                : "Loading"}
              <Pagination
                data={books}
                setData={setBooks}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            </div>
          </div>
        </Card>
      </Container>

      {viewBook && (
        <BookModal
          ref={bookRef}
          book={viewBook}
          show={showBookModal}
          onHide={() => {
            setViewBook(null);
            setShowBookModal(false);
          }}
        />
      )}
    </>
  );
}
