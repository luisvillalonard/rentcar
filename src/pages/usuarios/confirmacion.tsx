import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../hooks/useData";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BsAlphabet } from "react-icons/bs";
import { Persona } from "../../interfaces/entidades/persona";
import { IoIosBarcode } from "react-icons/io";
import { GoMail, GoShieldCheck, GoAlert } from "react-icons/go";
import { MdOutlinePassword } from "react-icons/md";
import { useForm } from "../../hooks/useForm";
import { UsuarioCambioClave } from "../../interfaces/entidades/usuario";
import Loading from "../../components/loading";
import RequiredLabel from "../../components/requiredLabel";

const ConfirmacionRegistroPage = () => {
    const {
        contextPropietarios: { state: { modelo, procesando }, nuevo, porCodigo },
        contextUsuarios: { state: { procesando: procesandoClave }, cambiarClave }
    } = useData();
    const [propietario, setPropietario] = useState<Persona | null | undefined>(modelo);
    const { entidad: usuario, editar, handleChangeInput } = useForm<UsuarioCambioClave>({ id: 0, passwordNew: null, passwordConfirm: null });
    const [isValid, setIsValid] = useState<boolean>(true);
    const [validated, setValidated] = useState<boolean>(false);
    const [confirmado, setConfirmado] = useState<boolean>(false);
    const { codigo } = useParams();

    const obtenerPropietario = async (codigo: string) => {
        const resp = await porCodigo(codigo);
        if (!resp) {
            setIsValid(false);
            setPropietario(null);
        } else if (resp && resp.ok && !resp.datos) {
            setIsValid(false);
            setPropietario(null);
        }
        if (resp.ok && resp.datos) {
            const prop = resp.datos as Persona;
            setPropietario(prop);
            if (!prop.usuario?.cambio) {
                editar({
                    ...usuario,
                    id: prop.usuario?.id ?? 0,
                });
                setConfirmado(false);
            } else if (prop.usuario.cambio === true) {
                setConfirmado(true);
            }
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
            Alerta(resp.mensaje || 'Situación inesperada tratando de cambiar la clave del propietario.');
        } else {
            Exito('La contraseña fue cambiada exitosamente.');
            setIsValid(true);
            setConfirmado(true);
        }
    }

    useEffect(() => {
        nuevo && nuevo();
        obtenerPropietario(codigo as string);
    }, [])

    return (
        <>
            <Container className="py-4">
                <Col lg={10} md={10} xs={12} className="mx-auto">
                    <h1 className="fs-2 fw-light m-0">Confirmaci&oacute;n de Registro</h1>
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
                                            El código de confirmaci&oacute;n de usuario es invalido.
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
                                                {`Se ha confirmado el acceso y cambiado la contraseña para el usuario de ${propietario?.nombre}`}
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
                                            <div>{propietario?.nombre || 'Desconocido'}</div>
                                        </Col>
                                        <Col xs={12} className="mb-4">
                                            <div className="d-flex aling-items-center">
                                                <IoIosBarcode className="fs-3 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">C&eacute;dula</span>
                                            </div>
                                            <div>{propietario?.documento || 'N/A'}</div>
                                        </Col>
                                        <Col xs={12} className="mb-4">
                                            <div className="d-flex aling-items-center">
                                                <GoMail className="fs-4 text-secondary me-2" />
                                                <span className="fs-6 fw-bolder">Correo Electr&oacute;nico</span>
                                            </div>
                                            <div>{propietario?.correo || 'N/A'}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} xs={12} className="mb-4">
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
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} xs={12} className="mb-4">
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
                                        </Col>
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
                Visible={procesando || procesandoClave}
                Mensaje={
                    procesando
                        ? 'Validando código de propietario, espere...'
                        : procesandoClave
                            ? 'Cambiando la contraseña del usuario, espere...'
                            : 'procesando, espere...'
                } />
        </>
    )
}
export default ConfirmacionRegistroPage;
