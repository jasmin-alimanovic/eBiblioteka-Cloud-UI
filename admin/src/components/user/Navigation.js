import React from "react";

import { Container, Navbar, Nav, Image } from "react-bootstrap";
import Logo from "../../assets/img/logo.svg";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PersonIcon from "../../assets/img/person.svg";
import OdjavaIcon from "../../assets/img/logout.svg";

export default function Navigation({ getZaduzeneKnjige, logout }) {
  const history = useHistory();

  return (
    <Navbar fixed="top" variant="light" bg="white" expand="lg">
      <Container>
        <Link style={{ textDecoration: "none" }} to="/knjige">
          <Navbar.Brand>
            <Image
              height="36"
              width="36"
              className="me-3"
              src={Logo}
              alt="logo icon"
            />
            Biblioteka Cloud
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className="nav-link"
              to="/knjige"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              onClick={async (e) => {
                e.preventDefault();
                history.push("/knjige?zaduzene=true");
              }}
              className="nav-link"
              to="/knjige#"
              style={{ textDecoration: "none" }}
            >
              Zadužene knjige
            </Link>
          </Nav>
          <Nav className="me-5">
            <Link
              className="nav-link"
              to="/profil"
              style={{
                textDecoration: "none",
              }}
            >
              <Image alt="person icon" src={PersonIcon} /> Profil
            </Link>
            <Link
              className="nav-link"
              to="/"
              onClick={(e) => {
                logout();
              }}
              style={{
                textDecoration: "none",
              }}
            >
              <Image alt="person icon" src={OdjavaIcon} /> Odjava
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
