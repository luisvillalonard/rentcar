import { Col, Container, Row } from "react-bootstrap";
import { FaPhoneVolume } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { useData } from "../hooks/useData";
import { PiMapPinAreaLight } from "react-icons/pi";

const ContactoPage = () => {
    const { contextAuth: { state: { user } } } = useData();

    return (
        <Container className="py-4">
            <h1 className="fs-1 fw-light mb-5">Contacto</h1>

            <Row>
                <Col md={5} xs={12}>
                    <Container>
                        <Row>
                            <Col xs={12} className="mb-3">
                                <div className="d-flex aling-items-center">
                                    <FaPhoneVolume className="fs-5 text-secondary me-2" />
                                    <span className="fs-6 fw-bolder">809-555-1234</span>
                                </div>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <div className="d-flex aling-items-center">
                                    <GoMail className="fs-5 text-secondary me-2" />
                                    <span className="fs-6 fw-bolder">micorreo@correo.com</span>
                                </div>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <div className="d-flex aling-items-center">
                                    <PiMapPinAreaLight className="fs-5 text-secondary me-2" />
                                    <span className="fs-6 fw-bolder">Una direcci&oacute;n a la que quiera que me visiten.</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={7} xs={12}></Col>
            </Row>
        </Container>
    )
}
export default ContactoPage;
