import React, {  useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import leftArrow from "../../assets/img/left-arrow.svg";
import rightArrow from "../../assets/img/right-arrow.svg";
export default function Pagination({
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
}) {
  //decalration of components states

  useEffect(() => {
    document.title = "eBiblioteka Cloud-Knjige";
  }, []);

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
    <section
      style={{
        borderTop: "1px solid #0004",
        borderBottom: "1px solid #0004",
        padding: "1rem",
        width: "100%",
      }}
      className="d-flex justify-content-end"
    >
      <div
        style={{
          fontSize: "14px",
          color: "#9FA2B4",
          display: "flex",
          alignItems: "center",
        }}
        className="me-5"
      >
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Rows per page &nbsp;
            <span style={{ color: "black", fontSize: "16px" }}>{pageSize}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setPageSize(5);
              }}
              eventKey="1"
            >
              5
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setPageSize(10);
              }}
              eventKey="2"
            >
              10
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setPageSize(15);
              }}
              eventKey="3"
            >
              15
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="p-0 d-flex align-items-center">
        <span className="me-3">
          {pageSize * (page - 1) + 1}-
          {pageSize * page < data?.count ? pageSize * page : data?.count} od{" "}
          {data?.count} &nbsp;&nbsp;{" "}
        </span>
        <Button
          variant="light"
          className="p-0"
          disabled={data?.previous ? false : true}
          onClick={() => {
            setPage((page) => page - 1);
          }}
        >
          <img src={leftArrow} alt="" />
        </Button>{" "}
        <Button
          disabled={data?.next ? false : true}
          onClick={() => {
            setPage((page) => page + 1);
          }}
          className="p-0"
          variant="light"
        >
          {" "}
          <img src={rightArrow} alt="" />
        </Button>
      </div>
    </section>
  );
}
