import React from "react";
import sortIcon from "../../assets/img/sort.svg";
import upIcon from "../../assets/img/sort-up.svg";
import downIcon from "../../assets/img/sort-down.svg";
import { Dropdown, Image } from "react-bootstrap";
export default function DropdownSort({ setSort, setActiveSort, activeSort }) {
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
    <Dropdown className="ms-2">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <Image src={sortIcon} alt="sort icon" />
        &nbsp; Sortiraj
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={activeSort === 1}
          onClick={() => {
            setActiveSort(1);
            setSort("id_desc");
          }}
          eventKey="1"
        >
          <span>Najnovije postavljeno</span>
          <img height="30" width="30" alt="" src={downIcon} />
        </Dropdown.Item>
        <Dropdown.Item
          active={activeSort === 3}
          onClick={() => {
            setActiveSort(3);
            setSort("naziv_desc");
          }}
          eventKey="2"
        >
          Naziv <img alt="" src={downIcon} />
        </Dropdown.Item>

        <Dropdown.Item
          active={activeSort === 6}
          onClick={() => {
            setActiveSort(6);
            setSort("godina_desc");
          }}
          eventKey="4"
        >
          Godina izdavanja <img alt="" src={downIcon} />
        </Dropdown.Item>
        <Dropdown.Item
          active={activeSort === 2}
          onClick={() => {
            setActiveSort(2);
            setSort("naziv");
          }}
          eventKey="2"
        >
          Naziv <img alt="" src={upIcon} />
        </Dropdown.Item>
        <Dropdown.Item
          active={activeSort === 7}
          onClick={() => {
            setActiveSort(7);
            setSort("godina");
          }}
          eventKey="5"
        >
          Godina izdavanja <img alt="" src={upIcon} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
