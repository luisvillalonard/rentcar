import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import { useData } from "../hooks/useData";
import { Login } from "../interfaces/globales/auth";
import { useForm } from "../hooks/useForm";
import { Alerta } from "../hooks/useMensaje";
import { useNavigate } from "react-router";
import Loading from "../components/loading";
import { rutas } from "../components/rutas";
import { ChangeEvent, useState } from "react";

const LoginPage = () => {

    const { contextAuth: { state: { procesando }, validar } } = useData();
    const { entidad, handleChangeInput } = useForm<Login>({ usuario: '', clave: '', recuerdame: false });
    const [validated, setValidated] = useState<boolean>(false);
    const nav = useNavigate();

    const validarUsuario = async (evt: ChangeEvent<HTMLFormElement>) => {
        evt.preventDefault();
        evt.stopPropagation();

        const form = evt.currentTarget;
        const valido = form.checkValidity();
        if (!valido) {
            setValidated(true);
            return;
        } else if (!entidad) {
            return;
        }

        const resp = await validar(entidad);
        if (!resp.ok) {
            Alerta(resp.mensaje || 'Situación inesperada tratando de validar el nombre del usuario.')
            return;
        }
        nav(rutas.Home);
    }

    return (
        <div className="home-wrap">
            <div className="w-100 h-100 position-absolute d-flex overflow-hidden bg-black bg-opacity-50">
                <Container as={Col} lg={4} md={5} xs={9} className="m-auto text-white">
                    <h1 className="text-center fs-2 fw-bolder mb-4">Log&iacute;n</h1>
                    <Form id="formvehiculo" noValidate validated={validated} onSubmit={validarUsuario}>
                        <Row>
                            <Form.Group as={Col} xs={12} className="mb-4 position-relative">
                                <Form.Control
                                    id="ctUsuario"
                                    type="text"
                                    name="usuario"
                                    autoComplete="off"
                                    placeholder="escriba aqui su cédula sin guiones"
                                    className="rounded-pill border-white bg-opacity-25 text-center text-white py-2 px-3 placeholder-white"
                                    required
                                    value={entidad.usuario || ''}
                                    onChange={handleChangeInput}
                                    onFocus={(e) => e.target.select()} />
                                <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                    Obligatorio
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs={12} className="mb-4 position-relative">
                                <Form.Control
                                    type="password"
                                    name="clave"
                                    autoComplete="off"
                                    placeholder="escriba aqui su contraseña"
                                    className="rounded-pill border-white bg-opacity-25 text-center text-white py-2 px-3 placeholder-white"
                                    required
                                    value={entidad.clave || ''}
                                    onChange={handleChangeInput}
                                    onFocus={(e) => e.target.select()} />
                                <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                    Obligatorio
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Col xs={12} className="mb-4 align-self-end">
                                <Button type="submit" variant="primary" className="w-100 rounded-pill">Aceptar</Button>
                            </Col>
                            <Col xs={12} className="mb-3 align-self-center">
                                <Row>
                                    <Col xs={6}>
                                        <Form.Check
                                            id="recuerdame"
                                            name="recuerdame"
                                            type="switch"
                                            label="Recuerdame"
                                            className="text-white"
                                            required={false}
                                            formNoValidate={false}
                                            checked={entidad?.recuerdame}
                                            onChange={handleChangeInput} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Loading Visible={procesando} Mensaje="Validando, espere..." />
            </div>
        </div>
    )
}
export default LoginPage;
