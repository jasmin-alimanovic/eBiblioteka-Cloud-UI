import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
// import { useHistory } from "react-router";
import { getUsers, getNewUsers } from "../services/userService";
import { getbooks } from "../services/bookService";
import MenuComponent from "./Menu";
import { Card } from "react-bootstrap";
import personIcon from "../assets/img/person.svg";
export default function Dashboard() {
  const [users, setUsers] = useState(null);
  const [books, setBooks] = useState(null);
  const [newUsers, setNewUsers] = useState(null);

  useEffect(() => {
    getUsers("", "", 1, 5).then((data) => {
      setUsers(data);
    });
    getNewUsers("", "", 1, 5).then((data) => {
      setNewUsers(data);
    });
    getbooks("", "", 1, 5).then((data) => {
      setBooks(data);
    });
  }, [users]);
  const { currentUser } = useAuth();
  //   const history = useHistory();
  return (
    <div className="d-flex w-100">
      <MenuComponent />
      <div id="main" className="w-100">
        <div className="m-5 d-flex justify-content-between">
          <h1>HOME</h1>
          <div className="user-detail">
            <span>
              | {currentUser?.ime}&nbsp; {currentUser?.prezime}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              <img src={personIcon} alt="person icon" />
            </span>
          </div>
        </div>
        <div
          className="d-flex w-100 justify-content-around"
          style={{ height: "10rem" }}
        >
          <Card className="justify-content-around w-100 mx-5 align-items-center card-highlight">
            <Card.Title>
              <span className="clr-grey-light">Korisnici</span>
            </Card.Title>
            <Card.Title>
              <h1>
                <strong>{!users ? "loading.." : users.count}</strong>
              </h1>
            </Card.Title>
          </Card>
          <Card className="justify-content-around w-100 align-items-center card-highlight">
            <Card.Title>
              <span className="clr-grey-light">Novi korisnici</span>
            </Card.Title>
            <Card.Title>
              <h1>
                <strong>{!newUsers ? "loading.." : newUsers.count}</strong>
              </h1>
            </Card.Title>
          </Card>
          <Card className="justify-content-around mx-5 w-100 align-items-center card-highlight">
            <Card.Title>
              <span className="clr-grey-light">Ukupno knjiga</span>
            </Card.Title>
            <Card.Title>
              <h1>
                <strong>{!books ? "loading.." : books.count}</strong>
              </h1>
            </Card.Title>
          </Card>
          <Card
            className="justify-content-around w-100 align-items-center card-highlight"
            style={{ marginRight: "3rem" }}
          >
            <Card.Title className="mt-2">
              <span className="clr-grey-light">Podignute knjige</span>
            </Card.Title>
            <Card.Title>
              <h1>
                <strong>60</strong>
              </h1>
            </Card.Title>
          </Card>
        </div>
      </div>
    </div>
  );
}
