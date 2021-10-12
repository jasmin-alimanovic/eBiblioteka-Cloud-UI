import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Kategorije({
  kategorije,
  history,
  kategorija,
  setKategorija,
  setPage,
  icon,
}) {
  return (
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
          <Image src={icon} /> Obriši filter
        </li>
      )}
    </ul>
  );
}
