import React, { useState } from 'react'
import {
    Navbar, Nav,
    Container,
} from 'react-bootstrap';
import {  NavLink } from "react-router-dom";
export default function NavComponent() {
    const [expand, setExpand] = useState(false)
    const color = "#273036"

    return (
        <div>
            <Navbar collapseOnSelect variant='dark' expand={false} expanded={expand} style={{ backgroundColor: color }}>

                <Container fluid>
                    <Navbar.Brand href="#">Pay Buy</Navbar.Brand>
                    <Navbar.Toggle onClick={() => setExpand(expand ? false : "expand")} aria-controls="offcanvasNavbar" style={{ border: "none" }} />
                    <Navbar.Collapse id="offcanvasNavbar">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={NavLink} onClick={() => setExpand(false)} to='/time-sheet'>Home</Nav.Link>
                            <Nav.Link as={NavLink} onClick={() => setExpand(false)} to='/all-categories'>Categories</Nav.Link>
                            <Nav.Link as={NavLink} onClick={() => setExpand(false)} to='income-sources'>Income Sources</Nav.Link>
                            <Nav.Link as={NavLink} onClick={() => setExpand(false)} to='account'>My Account</Nav.Link>
                            <Nav.Link as={NavLink} onClick={() => setExpand(false)} to='/habits-tracker'>Habits Tracker</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <svg style={{ marginTop: "-10px" }} viewBox="0 0 1420 320">
                <path fill="#273036" fillOpacity="1" d="M0,224L24,202.7C48,181,96,139,144,117.3C192,96,240,96,288,96C336,96,384,96,432,112C480,128,528,160,576,149.3C624,139,672,85,720,80C768,75,816,117,864,144C912,171,960,181,1008,170.7C1056,160,1104,128,1152,101.3C1200,75,1248,53,1296,64C1344,75,1392,117,1416,138.7L1440,160L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
            </svg>
        </div>
        // ============================================================


    )
}
