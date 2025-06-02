import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { useDispatch, useSelector } from "react-redux";

function Navbarr() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const isAuth = localStorage.getItem("token");

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src='./slogo.png' width={'150px'} height={'30px'} style={{ display: 'block', marginBottom: '-60px' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">

            <Nav.Link as={Link} to="/" style={{ fontWeight: 'bold' }}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ fontWeight: 'bold' }}>
              Qui sommes nous
            </Nav.Link>

           <NavDropdown title="Nos produits" id="collapsible-nav-dropdown" style={{ fontWeight: 'bold' }}>
  <NavDropdown.Item as={Link} to="/portes/articles">Portes</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/articles_décoratifs/articles">Articles décoratifs</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/cabine/articles">Cabines</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/tables et chaises/articles">Tables & chaises</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/categorie">Catalogue de produits</NavDropdown.Item>
</NavDropdown>


            <Nav.Link as={Link} to="/contact" style={{ fontWeight: 'bold' }}>
              Contactez nous
            </Nav.Link>

            {isAuth && user?.role === "user" && (
              <>
                <Nav.Link as={Link} to="/userprofile" style={{ fontWeight: 'bold' }}>
                  {user?.name}
                </Nav.Link>
                <Nav.Link as={Link} to="/clientorders" style={{ fontWeight: 'bold' }}>
                  Commandes
                </Nav.Link>
                <Nav.Link as={Link} to="/panier">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512">
                    <path fill="#007bff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0
                      45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6
                      19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4
                      54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1
                      1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                  </svg>
                </Nav.Link>
              </>
            )}

            {isAuth && user?.role === "admin" && (
              <Nav.Link as={Link} to="/dashboard" style={{ fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'cursive' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                  <path fill="#007bff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3
                  1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6
                  c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2
                  c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1
                  c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5
                  c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1
                  425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1
                  c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1
                  64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6
                  c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2
                  c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1
                  c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5
                  c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7
                  c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1
                  c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                </svg>
              </Nav.Link>
            )}

            {isAuth ? (
              <Nav.Link onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                  <path fill="#007bff" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3
                  0s-12.5 32.8 0 45.3L402.7 224H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h210.7l-73.4 73.4
                  c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96
                  C43 32 0 75 0 128v256c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96
                  c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h64z"/>
                </svg>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
                  <path fill="#007bff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8
                  304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3
                  29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                </svg>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbarr
