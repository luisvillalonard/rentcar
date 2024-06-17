import { Col, Container, Row } from "react-bootstrap";
import { FaPhoneVolume } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { useData } from "../hooks/useData";
import { PiMapPinAreaLight } from "react-icons/pi";
import MensajeFormulario from "./mensajes/formulario";
import { RiContactsLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { useEffect } from "react";

const ContactoPage = () => {
    const { 
        contextAuth: { state: { user } },
        contextMensajes: { nuevo }
    } = useData();

    useEffect(() => {
        nuevo && nuevo()
    },[])

    return (
        <Container as={Col} className="mt-4 mb-3 col-md-9">
            <h1 className="fs-2 fw-lighter m-0">Contacto</h1>
            <hr />

            <Row>
                <Col md={7} xs={12}>
                    <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                        <AiOutlineMessage className="me-2" />
                        <span>Mensaje</span>
                    </div>
                    <MensajeFormulario Flotante={false} />
                </Col>
                <Col md={5} xs={12}>
                    <Container>
                        <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                            <RiContactsLine className="me-2" />
                            <span>Contactenos</span>
                        </div>
                        <Row>
                            <Col xs={12} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <FaPhoneVolume className="fs-5 text-secondary me-2" />
                                    <span className="fs-6 fw-bolder">809-555-1234</span>
                                </div>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <GoMail className="fs-5 text-secondary me-2" />
                                    <span className="fs-6 fw-bolder">micorreo@correo.com</span>
                                </div>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <PiMapPinAreaLight className="fs-4 text-secondary me-2" />
                                    </div>
                                    <span className="fs-6 fw-bolder">Una direcci&oacute;n a la que quiera que me visiten.</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
export default ContactoPage;
