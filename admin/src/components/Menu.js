import React, { useEffect, useState } from "react";
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

import homeIcon from "../assets/img/home.svg";
import usersIcon from "../assets/img/users.svg";
import bookIcon from "../assets/img/books.svg";
import kategorijaIcon from "../assets/img/kategorija.svg";
import person from "../assets/img/person.svg";
import logoutIcon from "../assets/img/logout.svg";
import postavke from "../assets/img/postavke.svg";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function MenuComponent() {
  const { logout, currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1025) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <ProSidebar
      collapsed={collapsed}
      style={{
        height: "101vh",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      <Menu iconShape="square">
        <SidebarHeader className="mt-1">
          <MenuItem
            className="mb-3 mt-3"
            icon={
              <img
                src={logo}
                style={{ width: "30px", height: "30px" }}
                alt="icon"
              />
            }
          >
            &nbsp;&nbsp;&nbsp;{" "}
            <span style={{ fontSize: "1rem" }}>
              E-BIBLIOTEKA
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;CLOUD
              <Link to="/dashboard" />
            </span>
          </MenuItem>
        </SidebarHeader>
        <SidebarContent className="pt-3 pb-3 ">
          <MenuItem
            icon={
              <img
                style={{ color: "#fff" }}
                src={homeIcon}
                alt="home icon"
                className="active"
              />
            }
            title="HOME"
          >
            HOME
            <Link to="/dashboard" />
          </MenuItem>
          <MenuItem
            title="Korisnici"
            icon={<img src={usersIcon} alt="people icon" />}
          >
            Korisnici
            <Link to="/admin/korisnici" />
          </MenuItem>
          <MenuItem
            title="Knjige"
            icon={<img src={bookIcon} alt="book icon" />}
          >
            Knjige
            <Link to="/admin/knjige" />
          </MenuItem>
          <MenuItem
            title="Zadužbe"
            icon={<img src={bookIcon} alt="book icon" />}
          >
            Zadužbe
            <Link to="/admin/zaduzbe" />
          </MenuItem>
          <MenuItem
            title="Žanrovi"
            icon={<img src={kategorijaIcon} alt="category icon" />}
          >
            Žanrovi
            <Link to="/admin/zanrovi" />
          </MenuItem>
          <MenuItem
            title="Autori"
            icon={<img src={person} alt="person icon" />}
          >
            Autori
            <Link to="/admin/autori" />
          </MenuItem>
          <MenuItem
            title="Izdavači"
            icon={<img src={person} alt="person icon" />}
          >
            Izdavači
            <Link to="/admin/izdavaci" />
          </MenuItem>
          {currentUser && currentUser.uloga.naziv === "Admin" && (
            <MenuItem
              title="Zaposlenici"
              icon={<img src={person} alt="person icon" />}
            >
              Zaposlenici
              <Link to="/admin/zaposlenici" />
            </MenuItem>
          )}
        </SidebarContent>
        <SidebarFooter className="mb-5 mt-0">
          <MenuItem
            style={{
              borderBottom: "1px solid #494C61",
              borderTop: "1px solid #494C61",
            }}
            icon={<img src={postavke} alt="home icon" />}
            className="mt-0"
          >
            Postavke
            <Link to="/admin/postavke" />
          </MenuItem>
          <MenuItem
            style={{ borderBottom: "1px solid #494C61" }}
            className="mb-4"
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
