import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { MdPersonOutline, MdOutlineLogout } from "react-icons/md";
import { updateAuthStoreStateLogout } from "../../features/authentication/updateAuthState";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == "admin";

  

  // handlers
  const handleLogout = () => {
    updateAuthStoreStateLogout();
    navigate("/");
  };

  return (
    <div className="Header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavLink className="nav-link text-white" to="/menu" >
            <img src="../../../img/img logo.png" alt="imagen-logo"  className="logo" />
          </NavLink>
            <Nav className="me-auto header-admin">
              {isAdmin && (
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              )}
            </Nav>
            {isLoggedIn && (
              <Nav>
                <NavDropdown title={name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    <MdPersonOutline /> Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <MdOutlineLogout /> Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
        </Container>
      </Navbar>
    </div>
  );
}
