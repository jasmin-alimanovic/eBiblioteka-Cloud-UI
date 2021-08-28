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
            </span>
          </MenuItem>
        </SidebarHeader>
        <SidebarContent className="mt-5 ">
          <MenuItem
            icon={
              <img style={{ color: "#fff" }} src={homeIcon} alt="home icon" />
            }
          >
            HOME
          </MenuItem>
          <MenuItem icon={<img src={usersIcon} alt="home icon" />}>
            Korisnici
          </MenuItem>
          <MenuItem icon={<img src={bookIcon} alt="home icon" />}>
            Knjige
          </MenuItem>
          <MenuItem icon={<img src={inventoryIcon} alt="home icon" />}>
            Nabavke
          </MenuItem>
          <MenuItem icon={<img src={kategorijaIcon} alt="home icon" />}>
            Žanrovi
          </MenuItem>
          <MenuItem icon={<img src={person} alt="home icon" />}>
            Autori
          </MenuItem>
          <MenuItem icon={<img src={person} alt="home icon" />}>
            Izdavači
          </MenuItem>
          {currentUser && currentUser.uloga.naziv === "Admin" && (
            <MenuItem
              onClick={logout}
              icon={<img src={person} alt="home icon" />}
            >
              Zaposlenici
            </MenuItem>
          )}
        </SidebarContent>
        <SidebarFooter className="mt-4">
          <MenuItem
            icon={<img src={postavke} alt="home icon" />}
            className="mt-4"
          >
            Postavke
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
