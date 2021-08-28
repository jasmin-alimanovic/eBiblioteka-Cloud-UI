import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useHistory } from "react-router";
import { getUsers } from "../services/userService";
import MenuComponent from "./Menu";
import { Card } from "react-bootstrap";
export default function Dashboard() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers("", "", 1, 5).then((data) => {
      setUsers(data);
    });
  }, [users]);
  //   const { currentUser, logout } = useAuth();
  //   const history = useHistory();
  return (
    <div className="d-flex w-100">
      <MenuComponent />
      <div id="main" className="w-100">
        <h1 className="m-4">HOME</h1>
        <div
          className="d-flex w-100 justify-content-around"
          style={{ height: "10rem" }}
        >
          <Card className="justify-content-around w-100 mx-5 align-items-center ">
            <Card.Title>Korisnici</Card.Title>
            <Card.Title>
              <h2>
                <strong>{!users ? "loading.." : users.count}</strong>
              </h2>
            </Card.Title>
          </Card>
          <Card className="justify-content-around w-100 align-items-center">
            <Card.Title>Novi korisnici</Card.Title>
            <Card.Title>
              <h1>
                <strong>60</strong>
              </h1>
            </Card.Title>
          </Card>
          <Card className="justify-content-around mx-5 w-100 align-items-center">
            <Card.Title>Ukupno knjiga</Card.Title>
            <Card.Title>
              <h2>
                <strong>60</strong>
              </h2>
            </Card.Title>
          </Card>
          <Card className="justify-content-around mx-5 w-100 align-items-center">
            <Card.Title>Podignute knjige</Card.Title>
            <Card.Title>
              <h2>
                <strong>60</strong>
              </h2>
            </Card.Title>
          </Card>
        </div>
      </div>
    </div>
  );
}
