import { Col, Container, Row } from "react-bootstrap";
import MensajesListado from "./listado";
import MensajeFormulario from "./formulario";

const MensajesPage = () => {
    return (
        <Container className="col-md-9 py-4">
            <h1 className="fs-2 fw-light m-0">Gesti&oacute;n de Mensajes</h1>
            <hr />
            <MensajesListado />
            <MensajeFormulario />
        </Container>
    )
}
export default MensajesPage;
