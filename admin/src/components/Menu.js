import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logo from "../assets/img/logo.svg";
import Icon from "./Icon";
import homeIcon from "../assets/img/home.svg";
import usersIcon from "../assets/img/users.svg";
import bookIcon from "../assets/img/books.svg";
import inventoryIcon from "../assets/img/inventory.svg";
import kategorijaIcon from "../assets/img/kategorija.svg";
import person from "../assets/img/person.svg";
import logoutIcon from "../assets/img/logout.svg";
import postavke from "../assets/img/postavke.svg";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function MenuComponent() {
  const { logout, currentUser } = useAuth();

  return (
    <ProSidebar style={{ minHeight: "100vh" }}>
      <Menu iconShape="square" style={{ minHeight: "100vh" }}>
        <SidebarHeader className="mt-1">
          <MenuItem className="mb-3 mt-3" icon={<Icon src={logo} alt="icon" />}>
            &nbsp;&nbsp;&nbsp;{" "}
            <span style={{ fontSize: "1rem" }}>
              E-BIBLIOTEKA
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;CLOUD
              <Link to="/" />
            </span>
          </MenuItem>
        </SidebarHeader>
        <SidebarContent className="mt-5 ">
          <MenuItem
            icon={
              <img
                style={{ color: "#fff" }}
                src={homeIcon}
                alt="home icon"
                className="active"
              />
            }
          >
            HOME
            <Link to="/" />
          </MenuItem>
          <MenuItem icon={<img src={usersIcon} alt="people icon" />}>
            Korisnici
            <Link to="/korisnici" />
          </MenuItem>
          <MenuItem icon={<img src={bookIcon} alt="book icon" />}>
            Knjige
            <Link to="/knjige" />
          </MenuItem>
          <MenuItem icon={<img src={inventoryIcon} alt="cart icon" />}>
            Nabavke
            <Link to="/nabavke" />
          </MenuItem>
          <MenuItem icon={<img src={kategorijaIcon} alt="category icon" />}>
            Žanrovi
            <Link to="/zanrovi" />
          </MenuItem>
          <MenuItem icon={<img src={person} alt="person icon" />}>
            Autori
            <Link to="/autori" />
          </MenuItem>
          <MenuItem icon={<img src={person} alt="person icon" />}>
            Izdavači
            <Link to="/izdavaci" />
          </MenuItem>
          {currentUser && currentUser.uloga.naziv === "Admin" && (
            <MenuItem icon={<img src={person} alt="person icon" />}>
              Zaposlenici
              <Link to="/zaposlenici" />
            </MenuItem>
          )}
        </SidebarContent>
        <SidebarFooter className="mt-4">
          <MenuItem
            icon={<img src={postavke} alt="home icon" />}
            className="mt-4"
          >
            Postavke
            <Link to="/postavke" />
          </MenuItem>
          <MenuItem
            onClick={logout}
            icon={<img src={logoutIcon} alt="home icon" />}
          >
            Odjavi se
          </MenuItem>
        </SidebarFooter>
      </Menu>
    </ProSidebar>
  );
}

export default MenuComponent;
