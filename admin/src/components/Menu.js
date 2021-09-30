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
import langIcon from "../assets/img/language.svg";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function MenuComponent() {
  const { logout, currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = window.location.pathname;
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
                style={{ color: "red", fill: "red" }}
                src={homeIcon}
                alt="home icon"
                className="active"
                color="#123456"
                onLoad="SVGInject(this)"
              />
            }
            active={pathname === "/dashboard"}
            title="HOME"
          >
            HOME
            <Link to="/dashboard" />
          </MenuItem>
          <MenuItem
            title="Korisnici"
            icon={<img src={usersIcon} alt="people icon" />}
            active={pathname === "/admin/korisnici"}
          >
            Korisnici
            <Link to="/admin/korisnici" />
          </MenuItem>
          <MenuItem
            title="Knjige"
            icon={<img src={bookIcon} alt="book icon" />}
            active={pathname === "/admin/knjige"}
          >
            Knjige
            <Link to="/admin/knjige" />
          </MenuItem>
          <MenuItem
            title="Zadužbe"
            icon={<img src={bookIcon} alt="book icon" />}
            active={pathname === "/admin/zaduzbe"}
          >
            Zadužbe
            <Link to="/admin/zaduzbe" />
          </MenuItem>
          {currentUser && currentUser.uloga.naziv === "Admin" && (
            <MenuItem
              title="Zaposlenici"
              icon={<img src={person} alt="person icon" />}
              active={pathname === "/admin/zaposlenici"}
            >
              Zaposlenici
              <Link to="/admin/zaposlenici" />
            </MenuItem>
          )}
          <MenuItem
            title="Žanrovi"
            icon={<img src={kategorijaIcon} alt="category icon" />}
            active={pathname === "/admin/zanrovi"}
          >
            Žanrovi
            <Link to="/admin/zanrovi" />
          </MenuItem>
          <MenuItem
            title="Autori"
            icon={<img src={person} alt="person icon" />}
            active={pathname === "/admin/autori"}
          >
            Autori
            <Link to="/admin/autori" />
          </MenuItem>
          <MenuItem
            title="Izdavači"
            icon={<img src={person} alt="person icon" />}
            active={pathname === "/admin/izdavaci"}
          >
            Izdavači
            <Link to="/admin/izdavaci" />
          </MenuItem>
          <MenuItem
            title="Jezici"
            icon={<img src={langIcon} alt="person icon" />}
            active={pathname === "/admin/jezici"}
          >
            Jezici
            <Link to="/admin/jezici" />
          </MenuItem>
        </SidebarContent>
        <SidebarFooter className="mb-5 mt-0">
          <MenuItem
            style={{
              borderBottom: "1px solid #494C61",
              borderTop: "1px solid #494C61",
            }}
            icon={<img src={postavke} alt="home icon" />}
            active={pathname === "/admin/postavke"}
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
