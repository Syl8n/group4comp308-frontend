import { Navbar } from 'react-bootstrap';

function Footer() {
  return (
    <Navbar className="navbar navbar-dark bg-dark custom-navbar fixed-bottom">
      <Navbar.Text className="text-muted mx-auto">
      &copy; 2023 All rights reserved. &nbsp; Group 4 | COMP308 &nbsp;&nbsp;&nbsp;Group Project
      </Navbar.Text>
    </Navbar>
  );
}

export default Footer;
