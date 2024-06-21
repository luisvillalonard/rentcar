import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import MenuApp from "./menu";

const FooterApp = () => {

    return (
        <Container fluid={true} className="bg-black p-5">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="d-flex flex-column text-white opacity-75">
                            <h1 className="fs-1 fw-bolder">La Manguera Car</h1>
                            <h1 className="fs-6 fw-bolder">Copyright © 2024</h1>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex flex-column">
                            <Navbar bg="transparent py-1" data-bs-theme="dark">
                                <Container>
                                    <MenuApp />
                                </Container>
                            </Navbar>
                            <Navbar bg="transparent py-0" data-bs-theme="dark">
                                <Container>
                                    <Nav className="ms-auto">
                                        <Nav.Item className="fs-6 text-white">809-555-1234</Nav.Item>
                                        <Nav.Item className="fs-6 text-white px-2">
                                            <div className="vr h-100 bg-white"></div>
                                        </Nav.Item>
                                        <Nav.Item className="fs-6 text-white">lamangueracar@correo.com</Nav.Item>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
export default FooterApp;
