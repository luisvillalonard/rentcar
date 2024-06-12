import { Button, Col, Container, Row } from "react-bootstrap";
import UsuariosListado from "./listado";
import { useData } from "../../hooks/useData";
import UsuarioFormulario from "./formulario";

const UsuariosPage = () => {
    const { contextUsuarios: { nuevo } } = useData();

    return (
        <Container className="">
            <Row>
                <Col md className="mb-3">
                    <h3>Gesti&oacute;n de Usuarios</h3>
                </Col>
                <Col md="auto" className="mb-3">
                    <Button variant="primary" className="rounded-pill" onClick={nuevo}>Nuevo</Button>
                </Col>
            </Row>
            <UsuariosListado />
            <UsuarioFormulario />
        </Container>
    )
}
export default UsuariosPage;
