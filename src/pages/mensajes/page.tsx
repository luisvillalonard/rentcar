import { Button, Col, Container, Row } from "react-bootstrap";
import MensajesListado from "./listado";
import MensajeFormulario from "./formulario";
import { useData } from "../../hooks/useData";
import { useEffect } from "react";

const MensajesPage = () => {
    const { contextMensajes: { nuevo, cancelar } } = useData();

    useEffect(() => {
        cancelar && cancelar();
    }, [])

    return (
        <>
            <Container className="py-4">
                <Col lg={10} md={10} xs={12} className="mx-auto">
                    <Row>
                        <Col md xs className="align-self-center mb-3">
                            <h1 className="fs-2 fw-light m-0">Gesti&oacute;n de Mensajes</h1>
                        </Col>
                        <Col md="auto" xs="auto" className="align-self-center mb-3">
                            <Button type="button" variant="primary" className="rounded-pill" onClick={() => nuevo && nuevo()}>Nuevo</Button>
                        </Col>
                    </Row>
                    <hr />
                    <MensajesListado />
                </Col>
            </Container>
            <MensajeFormulario Flotante={true} />
        </>
    )
}
export default MensajesPage;
