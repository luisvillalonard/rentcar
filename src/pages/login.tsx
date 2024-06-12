import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useData } from "../hooks/useData";
import { Login } from "../interfaces/globales/auth";
import { useForm } from "../hooks/useForm";
import { Alerta } from "../hooks/useMensaje";
import { useNavigate } from "react-router";
import Loading from "../components/loading";
import { rutas } from "../components/rutas";

const LoginPage = () => {

    const { contextAuth: { state: { procesando }, validar } } = useData();
    const { entidad, handleChangeInput } = useForm<Login>({ usuario: '', clave: '' });
    const nav = useNavigate();

    const ValidarUsuario = async () => {
        const resp = await validar(entidad);
        if (!resp)
            return;
        
        if (!resp.ok) {
            Alerta(resp.mensaje || 'Situación inesperada tratando de validar el nombre del usuario.')
            return;
        }
        nav(rutas.Home);
    }

    return (
        <div className="home-wrap">
            <div className="w-100 h-100 position-absolute d-flex overflow-hidden bg-black bg-opacity-25">
                <Container as={Col} lg={4} md={5} xs={9} className="m-auto text-white">
                    <Row>
                        <Col xs={12} className="mb-4">
                            <Form.Label className="fs-5 mb-1">Usuario</Form.Label>
                            <Form.Control
                                id="ctUsuario"
                                type="text"
                                name="usuario"
                                autoComplete="off"
                                size="lg"
                                placeholder="escriba aqui su usuario"
                                className="border-primary p-3"
                                value={entidad.usuario || ''}
                                onChange={handleChangeInput} />
                        </Col>
                        <Col xs={12} className="mb-5">
                            <Form.Label className="fs-5 mb-1">Contrase&ntilde;a</Form.Label>
                            <Form.Control
                                type="password"
                                name="clave"
                                autoComplete="off"
                                size="lg"
                                placeholder="escriba aqui su contraseña"
                                className="border-primary p-3"
                                value={entidad.clave || ''}
                                onChange={handleChangeInput} />
                        </Col>
                        <Col xs={12} className="mb-3 align-self-end">
                            <Button variant="primary" size="lg" className="w-100" onClick={ValidarUsuario}>Aceptar</Button>
                        </Col>
                    </Row>
                </Container>
                <Loading Visible={procesando} Mensaje="Validando, espere..." />
            </div>
        </div>
    )
}
export default LoginPage;
