import { ChangeEvent, useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsAlphabet } from "react-icons/bs";
import { IoIosBarcode } from "react-icons/io";
import { GoMail, GoShieldCheck, GoAlert } from "react-icons/go";
import { MdOutlinePassword } from "react-icons/md";
import { useForm } from "../../hooks/useForm";
import { Usuario, UsuarioCambioClave } from "../../interfaces/entidades/usuario";
import Loading from "../../components/loading";
import { useNavigate } from "react-router";
import { rutas } from "../../components/rutas";
import RequiredLabel from "../../components/requiredLabel";

const CambioClavePage = () => {
    const {
        contextAuth: { state: { user } },
        contextUsuarios: { state: { procesando }, porCodigo, cambiarClave }
    } = useData();
    const { entidad: usuario, editar, handleChangeInput } = useForm<UsuarioCambioClave | null>(null);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [validated, setValidated] = useState<boolean>(false);
    const [confirmado, setConfirmado] = useState<boolean>(false);
    const nav = useNavigate();

    const obtenerUsuario = async (codigo: string) => {
        const resp = await porCodigo(codigo);
        if (!resp) {
            setIsValid(false);
        } else if (resp && resp.ok && !resp.datos) {
            setIsValid(false);
        }
        if (resp.ok && resp.datos) {
            const usu = resp.datos as Usuario;
            editar({
                ...usuario,
                id: usu.id
            } as UsuarioCambioClave);
        }
    }

    const guardar = async (evt: ChangeEvent<HTMLFormElement>) => {
        evt.preventDefault();
        evt.stopPropagation();

        const form = evt.currentTarget;
        const valido = form.checkValidity();
        if (!valido) {
            setValidated(true);
            return;
        }

        if (!usuario || !cambiarClave) {
            setValidated(true);
            return;
        }

        const resp = await cambiarClave(usuario);
        if (!resp.ok) {
            Alerta(resp.mensaje || 'Situación inesperada tratando de cambiar la clave del usuario.');
        } else {
            Exito('La contraseña fue cambiada exitosamente.');
            nav(rutas.Home, { replace: true })
        }
    }

    useEffect(() => {
        obtenerUsuario(user?.codigo as string);
    }, [])

    return (
        <>
            <Container className="py-4">
                <Col lg={10} md={10} xs={12} className="mx-auto">
                    <h1 className="fs-2 fw-light m-0">Cambio de Contrase&ntilde;a</h1>
                    <hr className="mt-3 mb-4 pb-1" />

                    {
                        !isValid
                            ?
                            <Card className="shadow border-light">
                                <Card.Body>
                                    <div className="d-flex">
                                        <div className="p-1">
                                            <GoAlert className="text-danger display-1" />
                                        </div>
                                        <div className="px-3">
                                            <div className="vr h-100" />
                                        </div>
                                        <div className="flex-grow-1 align-self-center fs-3 lh-1 p-1">
                                            Su código de usuario es invalido.
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            : confirmado
                                ?
                                <Card className="shadow border-light">
                                    <Card.Body>
                                        <div className="d-flex">
                                            <div className="p-1">
                                                <GoShieldCheck className="text-success display-1" />
                                            </div>
                                            <div className="px-3">
                                                <div className="vr h-100" />
                                            </div>
                                            <div className="flex-grow-1 align-self-center fs-3 lh-1 p-1">
                                                {`Se ha confirmado el acceso y cambiado la contraseña para el usuario de ${user?.persona?.nombre}`}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                                :
                                <Form id="formConf" noValidate validated={validated} onSubmit={guardar}>
                                    <Row className="mb-3">
                                        <Col xs={12} className="mb-4">
                                            <div className="d-flex aling-items-center">
                                                <BsAlphabet className="fs-3 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">Nombres y Apellidos</span>
                                            </div>
                                            <div>{user?.persona?.nombre || 'Desconocido'}</div>
                                        </Col>
                                        <Col xs={12} className="mb-4">
                                            <div className="d-flex aling-items-center">
                                                <IoIosBarcode className="fs-3 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">C&eacute;dula</span>
                                            </div>
                                            <div>{user?.persona?.documento || 'N/A'}</div>
                                        </Col>
                                        <Col xs={12} className="mb-4">
                                            <div className="d-flex aling-items-center">
                                                <GoMail className="fs-4 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">Correo Electr&oacute;nico</span>
                                            </div>
                                            <div>{user?.persona?.correo || 'N/A'}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={6} xs={12} className="mb-4 position-relative">
                                            <div className="d-flex aling-items-center">
                                                <MdOutlinePassword className="fs-3 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">Nueva Contrase&ntilde;a</span>
                                            </div>
                                            <Form.Control
                                                type="password"
                                                name="passwordNew"
                                                autoComplete="off"
                                                className="border-0 border-bottom rounded-0"
                                                required
                                                value={usuario?.passwordNew || ''}
                                                onChange={handleChangeInput} />
                                            <RequiredLabel Text="Obligatorio" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={6} xs={12} className="mb-4 position-relative">
                                            <div className="d-flex aling-items-center">
                                                <MdOutlinePassword className="fs-3 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">Repetir Contrase&ntilde;a</span>
                                            </div>
                                            <Form.Control
                                                type="password"
                                                name="passwordConfirm"
                                                autoComplete="off"
                                                className="border-0 border-bottom rounded-0"
                                                required
                                                value={usuario?.passwordConfirm || ''}
                                                onChange={handleChangeInput} />
                                            <RequiredLabel Text="Obligatorio" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col md={6} xs={12} className="mb-3">
                                            <Button type="submit" variant="primary" className="rounded-pill" form="formConf">Cambiar Contrase&ntilde;a</Button>
                                        </Col>
                                    </Row>
                                </Form>
                    }
                </Col>
            </Container>
            <Loading
                Visible={procesando} Mensaje={
                    procesando && !usuario
                        ? 'Validando código de usuario, espere...'
                        : procesando && usuario
                            ? 'Cambiando la contraseña del usuario, espere...'
                            : 'procesando, espere...'
                } />
        </>
    )
}
export default CambioClavePage;
