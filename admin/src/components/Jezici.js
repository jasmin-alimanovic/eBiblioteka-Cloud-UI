import React, { useRef, useState, useEffect } from "react";
import { Form, Image, Dropdown, Button } from "react-bootstrap";

//local imports
import searchIcon from "../assets/img/search.svg";
import addIcon from "../assets/img/add.svg";
import MenuComponent from "./Menu";
import { useAuth } from "../contexts/AuthContext";
import moreIcon from "../assets/img/more.svg";
import { getjezike } from "../services/jezikService";
import AddJezikModal from "./modals/AddJezikModal";
import EditJezikModal from "./modals/EditJezikModal";

//
export default function Jezici() {
  const { currentUser } = useAuth();
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [addedUser, setAddedUser] = useState(null);
  const [userForEdit, setUserForEdit] = useState(null);

  const searchRef = useRef("");

  //function that handles submit of search field
  function handleSubmit() {
    setQuery(searchRef.current.value);
  }
  useEffect(() => {
    document.title = "eBiblioteka Cloud-Jezici";
  }, []);
  useEffect(() => {
    getjezike().then((data) => {
      let filtered_users = data?.filter((user) => {
        return user.naziv.toLowerCase().includes(query.trim().toLowerCase());
      });
      setUsers(filtered_users);
    });
  }, [query, addedUser]);

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick, dots }, ref) => (
    <span
      href="/"
      style={{ cursor: "pointer" }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {!dots && <span style={{ color: "black" }}>&#x25bc;</span>}
    </span>
  ));

  return (
    <div className="d-flex">
      <MenuComponent />
      <div className="push"></div>
      <main role="main" id="main" className="w-100">
        <section
          className="my-5 mx-3 d-flex justify-content-between"
          style={{ marginBottom: "1rem !important" }}
        >
          <h1>
            <strong>Jezici</strong>
          </h1>
          <div className="user-detail d-flex">
            <span>
              | {currentUser?.ime}&nbsp; {currentUser?.prezime}
            </span>
            <span style={{ marginLeft: "1rem" }}>
              <figure>
                <Image
                  height="30"
                  src={`https://eu.ui-avatars.com/api/?bold=true&name=${currentUser.ime}+${currentUser.prezime}&rounded=true&background=0af`}
                  alt=""
                />
              </figure>
            </span>
          </div>
        </section>
        <div id="books" className="ms-1">
          <section id="search-section w-100">
            <Image
              style={{
                position: "relative",
                top: "30px",
                left: "10px",
              }}
              src={searchIcon}
              alt="search icon"
            />{" "}
            <Form.Control
              className="ps-5 search-input"
              onChange={handleSubmit}
              type="search"
              placeholder="Pretraži po nazivu"
              ref={searchRef}
            />
          </section>
          <section
            id="books-pagination"
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <section
              id="books-header"
              className="d-flex mt-4 justify-content-between w-100"
            >
              <h3
                style={{
                  // marginLeft: "2rem",
                  marginTop: "1rem",
                  marginBottom: "0rem",
                }}
              >
                <strong>Svi jezici</strong>
              </h3>
              <div className="d-flex align-items-center">
                <Button
                  style={{
                    marginTop: "1rem",
                    marginLeft: "3rem",
                    borderRadius: "7px",
                  }}
                  onClick={() => {
                    setModalAddShow(true);
                  }}
                >
                  <Image src={addIcon} alt="sort icon" />
                  <span className="ms-2">Dodaj</span>
                </Button>
              </div>
            </section>
            <table className="book-table mt-5 justify-self-center">
              <thead
                style={{
                  borderBottom: "2px solid #0004",
                }}
              >
                <tr className="m-5 book-row">
                  <th style={{ width: "150px" }} className="px-3">
                    Ime
                  </th>

                  <th className="p-2" style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  color: "#0000008A",
                }}
              >
                {users !== null ? (
                  users?.map((jezik) => (
                    <tr className="book-row" key={jezik.id}>
                      <td className="p-2">
                        <div
                          className="p-1 w-100 h-100 d-flex align-items-center"
                          style={{ textAlign: "center", paddingRight: "3rem" }}
                        >
                          <span title={jezik.naziv}>{jezik.naziv}</span>
                        </div>
                      </td>

                      <td className="p-2" align="right">
                        <Dropdown drop="left">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                            dots={true}
                          >
                            <img src={moreIcon} alt="" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setUserForEdit(jezik);
                                setModalEditShow(true);
                              }}
                              eventKey="1"
                            >
                              Uredi
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Trenutno nema jezika</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
      <AddJezikModal
        setAddedUser={setAddedUser}
        show={modalAddShow}
        onHide={() => {
          setAddedUser(null);
          setModalAddShow(false);
        }}
      />
      <EditJezikModal
        setAddedUser={setAddedUser}
        show={modalEditShow}
        onHide={() => {
          setUserForEdit(null);
          setModalEditShow(false);
          setAddedUser(null);
        }}
        user={userForEdit}
      />
    </div>
  );
}
