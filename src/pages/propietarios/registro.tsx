import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsAlphabet } from "react-icons/bs";
import { FaMapMarkerAlt, FaPhoneVolume } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { RiDirectionLine } from "react-icons/ri";
import { IoIosBarcode } from "react-icons/io";
import { MdOutlineContactPhone, MdOutlinePhotoCamera } from "react-icons/md";
import { PiMapPinAreaLight } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { useData } from "../../hooks/useData";
import { useForm } from "../../hooks/useForm";
import { Persona } from "../../interfaces/entidades/persona";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Provincia } from "../../interfaces/entidades/provincia";
import { useLocation, useNavigate } from "react-router";
import { Alerta, Exito } from "../../hooks/useMensaje";
import Loading from "../../components/loading";
import { rutas } from "../../components/rutas";
import RequiredLabel from "../../components/requiredLabel";
import Imagen from "../../components/imagen";

const RegistroPropietarioPage = () => {
    const {
        contextPropietarios: { state: { modelo, editando, procesando }, nuevo, agregar },
        contextProvincias: { state: { datos: provincias, procesando: cargandoProvincias }, todos: cargarProvincias },
        contextMunicipios: { state: { datos: municipios, procesando: cargandoMunicipios }, todos: cargarMunicipios }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Persona | null | undefined>(modelo);
    const [validated, setValidated] = useState<boolean>(false);
    const refFoto = useRef<HTMLInputElement>(null);
    const url = useLocation();
    const nav = useNavigate();

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
            Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del propietario.');
        } else {
            Exito('Sus datos fueron registrados correctamente. Le fue enviado un correo electronico con una clave temporal para su ingreso al sistema.');
            nav(rutas.Home);
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
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
                                        <div className="d-flex aling-items-center">
                                            <IoIosBarcode className="fs-3 text-secondary me-2" />
                                            <span className="fs-6 fw-bolder">C&eacute;dula</span>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            name="documento"
                                            autoComplete="off"
                                            className="border-0 border-bottom rounded-0"
                                            placeholder="escriba aqui su cédula"
                                            required
                                            value={entidad?.documento || ''}
                                            onChange={handleChangeInput} />
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                </Row>

                                <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                                    <MdOutlineContactPhone className="me-2" />
                                    <span>Contacto</span>
                                </div>
                                <Row className="mb-3">
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                            value={entidad?.telefono2 || ''}
                                            onChange={handleChangeInput} />
                                    </Form.Group>
                                </Row>

                                <div className="fw-bolder text-primary d-flex align-items-center mb-4 fs-4">
                                    <FaMapMarkerAlt className="me-2" />
                                    <span>Ubicaci&oacute;n</span>
                                </div>
                                <Row className="mb-3">
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                                } as Persona);
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
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                                } as Persona);
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
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} className="mb-4 position-relative">
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
                                        <RequiredLabel Text="Obligatorio" />
                                    </Form.Group>
                                </Row>
                            </Col>
                            <Col md={5} xs={12}>
                                <Imagen Item={entidad?.foto}>
                                    <div className="position-absolute w-100 start-0 bottom-0" style={{ zIndex: 100 }}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (refFoto && refFoto.current && refFoto.current.click) {
                                                    refFoto.current?.click()
                                                }
                                            }}
                                            className="btn btn-link align-self-center rounded-0 w-100 bg-secondary opacity-50 text-decoration-none text-white">
                                            <MdOutlinePhotoCamera className="me-3" />
                                            <span>Cargar Imagen</span>
                                        </button>
                                        <input ref={refFoto} type="file" name="foto" className="d-none" onChange={handleChangeInput} accept=".jpg, .jpeg, .png" />
                                    </div>
                                </Imagen>
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
