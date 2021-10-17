import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
// import { useHistory } from "react-router";
import {
  getUsers,
  getNewUsers,
  getUserCountByDate,
} from "../services/userService";
import { getbooks } from "../services/bookService";
import { getZaduzbe, getZaduzbeCountByDate } from "../services/zaduzbaService";
import MenuComponent from "./Menu";
import { Card } from "react-bootstrap";
import personIcon from "../assets/img/person.svg";
import BarChart from "./BarChart";
export default function Dashboard() {
  const [users, setUsers] = useState(null);
  const [books, setBooks] = useState(null);
  const [newUsers, setNewUsers] = useState(null);
  const [zaduzbe, setZaduzbe] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [zaduzbaChartData, setZaduzbaChartData] = useState(null);
  const [width, setWidth] = useState(900);
  const { currentUser } = useAuth();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1050) {
        setWidth(700);
      }
      if (window.innerWidth <= 840) {
        setWidth(500);
      }
      if (window.innerWidth > 1050) {
        setWidth(900);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getUsers("", "", 1, 5, currentUser.xa).then((data) => {
      setUsers(data);
    });
    getNewUsers("", "", 1, 5, currentUser.xa).then((data) => {
      setNewUsers(data);
    });
    getbooks("", "", 1, 5).then((data) => {
      setBooks(data);
    });

    getZaduzbe("", "", 1, 5).then((data) => setZaduzbe(data));

    getUserCountByDate(7).then((data) => {
      setChartData(data);
    });

    getZaduzbeCountByDate(7).then((data) => setZaduzbaChartData(data));
  }, [currentUser.xa]);

  //   const history = useHistory();
  return (
    <div className="d-flex">
      <MenuComponent />
      <div className="push"></div>
      <div id="main" className="w-100">
        <div className="mx-5 mb-5 d-flex justify-content-between header">
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
          className="d-flex w-100 justify-content-around dashboard-cards"
          style={{ height: "10rem" }}
        >
          <div className="dashboard-card  d-flex justify-content-around">
            <Card
              style={{ textAlign: "center" }}
              className="justify-content-around px-3 w-100 mx-5 align-items-center card-highlight"
            >
              <Card.Title>
                <span className="clr-grey-light">Korisnici</span>
              </Card.Title>
              <Card.Title>
                <h1>
                  <strong>{!users ? "loading.." : users.count}</strong>
                </h1>
              </Card.Title>
            </Card>
            <Card
              style={{ textAlign: "center" }}
              className="justify-content-around px-3 w-100 align-items-center card-highlight"
            >
              <Card.Title>
                <span className="clr-grey-light">Novi korisnici</span>
              </Card.Title>
              <Card.Title>
                <h1>
                  <strong>{!newUsers ? "loading.." : newUsers.count}</strong>
                </h1>
              </Card.Title>
            </Card>
          </div>
          <div className="dashboard-card d-flex justify-content-around">
            <Card
              style={{ textAlign: "center" }}
              className="justify-content-around px-3 mx-5 w-100 align-items-center card-highlight"
            >
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
              className="justify-content-around px-3 w-100 align-items-center card-highlight"
              style={{ marginRight: "3rem", textAlign: "center" }}
            >
              <Card.Title className="mt-2">
                <span className="clr-grey-light">Podignute knjige</span>
              </Card.Title>
              <Card.Title>
                <h1>
                  <strong>{!zaduzbe ? "loading.." : zaduzbe.count}</strong>
                </h1>
              </Card.Title>
            </Card>
          </div>
        </div>
        <section
          className="charts py-5 my-5 w-100 d-flex flex-column justify-content-evenly align-items-center"
          style={{ height: "100vh" }}
        >
          {chartData && (
            <BarChart
              type="LineChart"
              title="Broj učlanjenih korisnika po danu"
              th="Datum"
              tv="Broj korisnika"
              data={chartData}
              height={300}
              width={width}
              len={7}
            />
          )}
          {zaduzbaChartData && (
            <BarChart
              type="BarChart"
              title="Broj izdatih knjiga po danu"
              th="Datum"
              tv="Broj knjiga"
              data={zaduzbaChartData}
              len={7}
              height={300}
              width={width}
            />
          )}
        </section>
      </div>
    </div>
  );
}
