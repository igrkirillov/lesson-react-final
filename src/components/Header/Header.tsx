import {useNavigate} from "react-router";
import {MouseEvent} from "react";
import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import logoImage from "../../assets/img/header-logo.png"

export function Header() {
    const navigate = useNavigate();
    const onHomeClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate("/");
    }
    return (
        <Navbar fixed="top" bg="light" data-bs-theme="light" className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logoImage}
                        className="d-inline-block align-top"
                        alt="Logo"/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/catalog">Каталог</Nav.Link>
                    <Nav.Link href="/shops">Магазины</Nav.Link>
                    <Nav.Link href="/contacts">Контакты</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Container>
        </Navbar>
    )
}