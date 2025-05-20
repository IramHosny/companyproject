import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';



function Navbarr() {



  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" style={{textDecoration:"none"}}> <Navbar.Brand href="#home"><img src='./slogo.png' width={'150px'} height={'30px'}  style={{ display: 'block', marginBottom: '-60px' }} /></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Link to="/" style={{textDecoration:"none" ,fontWeight:'bold'}}><Nav.Link href="#features">Accueil</Nav.Link></Link>
          <Link to="about"style={{textDecoration:"none",fontWeight:'bold'}}><Nav.Link href="#pricing">Qui sommes nous </Nav.Link></Link>
            <NavDropdown  title="Nos produits" id="collapsible-nav-dropdown" style={{fontWeight:'bold'}} >
              <NavDropdown.Item href="service1" style={{fontWeight:'bold'}}  >Portes</NavDropdown.Item>
              <NavDropdown.Item href="service2"style={{fontWeight:'bold'}}  >
                Articles décoratifs
              </NavDropdown.Item>
              <NavDropdown.Item href="service3" style={{fontWeight:'bold'}} > Cabines</NavDropdown.Item>
              <NavDropdown.Item href="table_chaise" style={{fontWeight:'bold'}} >Tables & chaises</NavDropdown.Item>
               <NavDropdown.Item href="catalogue" style={{fontWeight:'bold'}} > Catalogue de produits </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Link to="contact" style={{textDecoration:"none" ,fontWeight:'bold'}}> <Nav.Link href="#deets" >Contactez nous</Nav.Link></Link>
            
            <Nav.Link href="#deets">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512"><path fill="blue" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>           
             </Nav.Link>
            
             
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbarr