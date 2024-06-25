import { Button, Col, Container, Row } from "react-bootstrap";
import UsuariosListado from "./listado";
import { useData } from "../../hooks/useData";
import UsuarioFormulario from "./formulario";

const UsuariosPage = () => {
    const { contextUsuarios: { nuevo } } = useData();

    return (
        <Container className="py-4">
            <Col lg={10} md={10} xs={12} className="mx-auto">
                <Row>
                    <Col md xs className="align-self-center mb-3">
                        <h1 className="fs-2 fw-light m-0">Gesti&oacute;n de Usuarios</h1>
                    </Col>
                </Row>
                <UsuariosListado />
                <UsuarioFormulario />
            </Col>
        </Container>
    )
}
export default UsuariosPage;
