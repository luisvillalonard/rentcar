import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsAlphabet, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt, FaPhoneVolume } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { RiDirectionLine } from "react-icons/ri";
import { IoIosBarcode } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md";
import { PiMapPinAreaLight } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useData } from "../../hooks/useData";
import { useForm } from "../../hooks/useForm";
import { Propietario } from "../../interfaces/entidades/propietario";
import { ChangeEvent, useEffect, useState } from "react";
import { Provincia } from "../../interfaces/entidades/provincia";
import { useLocation } from "react-router";
import { Alerta, Exito } from "../../hooks/useMensaje";
import Loading from "../../components/loading";

const RegistroPropietarioPage = () => {
    const {
        contextPropietarios: { state: { modelo, editando, procesando }, nuevo, agregar },
        contextProvincias: { state: { datos: provincias, procesando: cargandoProvincias }, todos: cargarProvincias },
        contextMunicipios: { state: { datos: municipios, procesando: cargandoMunicipios }, todos: cargarMunicipios }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Propietario | null | undefined>(modelo);
    const [validated, setValidated] = useState<boolean>(false);
    const url = useLocation()

    useEffect(() => {
        nuevo && nuevo();
    }, [])

    useEffect(() => {
        if (editando) {
            editar(modelo);
            (async () => {
                cargarProvincias && await cargarProvincias(null);
                cargarMunicipios && await cargarMunicipios(null)
            })()
        }
    }, [editando])

    const guardar = async (evt: ChangeEvent<HTMLFormElement>) => {
        evt.preventDefault();
        evt.stopPropagation();

        const form = evt.currentTarget;
        const valido = form.checkValidity();
        if (!valido) {
            setValidated(true);
            return;
        }

        if (!entidad || !agregar) {
            setValidated(true);
            return;
        }

        const resp = await agregar(entidad);
        if (!resp.ok) {
            Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del propietario.')
        } else {
            Exito('Sus datos fueron registrados correctamente. Le fue enviado un correo electronico con una clave temporal para su ingreso al sistema.')
        }
    }

    return (
        <>
            <Container className="py-4">
                <Col lg={10} md={10} xs={12} className="mx-auto">
                    <Row>
                        <Col md xs className="align-self-center mb-3">
                            <h1 className="fs-2 fw-light m-0">Registro de Propietario</h1>
                        </Col>
                        <Col md="auto" xs="auto" className="align-self-center mb-3">
                            <Button type="submit" variant="primary" className="rounded-pill" form="formpropietario">Registrame</Button>
                        </Col>
                    </Row>

                    <hr className="mt-3 mb-4 pb-1" />

                    <Form id="formpropietario" noValidate validated={validated} onSubmit={guardar}>
                        <Row>
                            <Col md={7} xs={12}>
                                <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                                    <RiContactsLine className="me-2" />
                                    <span>Generales</span>
                                </div>
                                <Row className="mb-3">
                                    <Col xs={12} className="mb-4">
                                        <div className="d-flex aling-items-center">
                                            <BsAlphabet className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Nombres y Apellidos</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su nombre"
                                            required
                                            value={entidad?.nombre || ''}
                                            onChange={handleChangeInput} />
                                            <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                                Obligatorio
                                            </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-4">
                                        <div className="d-flex aling-items-center">
                                            <IoIosBarcode className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">C&eacute;dula</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="cedula"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su cédula"
                                            required
                                            value={entidad?.cedula || ''}
                                            onChange={handleChangeInput} />
                                            <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                                Obligatorio
                                            </Form.Control.Feedback>
                                    </Col>
                                </Row>

                                <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                                    <MdOutlineContactPhone className="me-2" />
                                    <span>Contacto</span>
                                </div>
                                <Row className="mb-3">
                                    <Col xs={12} className="mb-4">
                                        <div className="d-flex aling-items-center">
                                            <GoMail className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Correo Electr&oacute;nico</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="correo"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su correo"
                                            required
                                            value={entidad?.correo || ''}
                                            onChange={handleChangeInput} />
                                        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                            Obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-4">
                                        <div className="d-flex aling-items-center">
                                            <FaPhoneVolume className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Tel&eacute;fono 1</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="telefono1"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su teléfono"
                                            required
                                            value={entidad?.telefono1 || ''}
                                            onChange={handleChangeInput} />
                                        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                            Obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-4">
                                        <div className="d-flex aling-items-center">
                                            <FaPhoneVolume className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Tel&eacute;fono 2</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="telefono2"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su teléfono"
                                            required
                                            value={entidad?.telefono2 || ''}
                                            onChange={handleChangeInput} />
                                        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                            Obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>

                                <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                                    <FaMapMarkerAlt className="me-2" />
                                    <span>Ubicaci&oacute;n</span>
                                </div>
                                <Row className="mb-3">
                                    <Col xs={12} className="mb-3">
                                        <div className="d-flex aling-items-center">
                                            <PiMapPinAreaLight className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Provincia</span>
                                        </div>
                                        <Form.Select
                                            name="provincia"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.municipio?.provincia?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevaProvincia = provincias.filter(prov => prov.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    municipio: {
                                                        ...entidad?.municipio,
                                                        provincia: nuevaProvincia
                                                    } as Provincia
                                                } as Propietario);
                                            }}>
                                            <option value=""></option>
                                            {provincias.map((provincia) => {
                                                return (
                                                    <option key={provincia.id} value={provincia.id}>
                                                        {provincia.nombre}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                            Obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-3">
                                        <div className="d-flex aling-items-center">
                                            <PiMapPinAreaLight className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Municipio</span>
                                        </div>
                                        <Form.Select
                                            name="municipio"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.municipio?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoMunicipio = municipios.filter(mun => mun.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    municipio: nuevoMunicipio ?? entidad?.municipio
                                                } as Propietario);
                                            }}>
                                            <option value=""></option>
                                            {
                                                municipios
                                                    .filter(mun => mun.provincia?.id === entidad?.municipio?.provincia?.id)
                                                    .map((provincia) => {
                                                        return (
                                                            <option key={provincia.id} value={provincia.id}>
                                                                {provincia.nombre}
                                                            </option>
                                                        );
                                                    })}
                                        </Form.Select >
                                        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                            Obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-3">
                                        <div className="d-flex aling-items-center">
                                            <RiDirectionLine className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">Direcci&oacute;n</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="direccion"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su dirección"
                                            required
                                            value={entidad?.direccion || ''}
                                            onChange={handleChangeInput} />
                                        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder">
                                            Obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={5} xs={12}>
                                <div className="mg-fluid img-thumbnail position-relative" style={{ paddingTop: '100%' }}>
                                    <div className="position-absolute w-100 h-100 start-0 top-0 d-flex">
                                        <BsPersonBoundingBox className="m-auto w-75 h-auto text-secondary opacity-50" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Container>
            <Loading
                Visible={cargandoProvincias || cargandoMunicipios || procesando}
                Mensaje={
                    cargandoProvincias || cargandoMunicipios
                        ? "Cargando parametros, espere..."
                        : procesando
                            ? "Procesando, espere..."
                            : ''
                } />
        </>
    )
}
export default RegistroPropietarioPage;
