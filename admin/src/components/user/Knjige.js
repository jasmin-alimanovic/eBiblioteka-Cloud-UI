import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
export default function Knjige() {
  const { currentUser, logout } = useAuth();
  
  return (
    <div>
      <h1>Hello World</h1>
      Welcome{" "}
      <span>
        {currentUser?.ime} {currentUser?.prezime}
      </span>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
