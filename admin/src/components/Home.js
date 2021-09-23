import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="d-flex w-100 h-100 justify-content-center align-items-center">
      <Card
        className="d-flex flex-row justify-content-between"
        style={{
          width: "30%",
          backgroundColor: "#f6f7f9",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Link className="btn btn-link" to="/login">
          Prijava
        </Link>
        <Link className="btn btn-primary" to="/admin/login">
          Prijava kao admin
        </Link>
      </Card>
    </Container>
  );
}
