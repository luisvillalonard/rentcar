import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { useData } from "../../hooks/useData";
import { useParams } from "react-router";
import { Vehiculo } from "../../interfaces/entidades/vehiculo";
import VehiculoAlquiler from "../vehiculos/vehiculo";
import Loading from "../../components/loading";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { useForm } from "../../hooks/useForm";
import { Alquiler } from "../../interfaces/entidades/alquiler";
import { BsReceipt } from "react-icons/bs";
import { Persona } from "../../interfaces/entidades/persona";
import { Provincia } from "../../interfaces/entidades/provincia";
import { FormatNumber } from "../../hooks/useUtils";

const AlquilerRegistroPage = () => {
    const {
        contextAlquileres: { state: { modelo, editando, procesando }, nuevo, agregar },
        contextProvincias: { state: { datos: provincias, procesando: cargandoProvincias }, todos: cargarProvincias },
        contextMunicipios: { state: { datos: municipios, procesando: cargandoMunicipios }, todos: cargarMunicipios },
        contextVehiculos: { porCodigo }
    } = useData();
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const { entidad: alquiler, editar: editarAlquiler, handleChangeInput: handleChangeInputAlquiler } = useForm<Alquiler | null | undefined>(modelo);
    const { entidad: persona, editar: editarPersona, handleChangeInput: handleChangeInputPersona } = useForm<Persona | null>({
        id: 0,
        esCedula: true,
        documento: null,
        nombre: null,
        licencia: null,
        provincia: null,
        municipio: null,
        direccion: null,
        telefono1: null,
        telefono2: null,
    });
    const [validated, setValidated] = useState<boolean>(false);
    const { codigo } = useParams();

    const cargar = async () => {
        if (!codigo) {
            Alerta('Código de vehiculo inválido.');
            return;
        }
        const resp = await porCodigo(codigo);
        if (resp && resp.ok) {
            setVehiculo(resp.datos as Vehiculo)
        }
    }

    const calculaPrecio = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        const precio = vehiculo?.precio || 0;
        let inicio = alquiler?.fechaInicio;
        let fin = alquiler?.fechaFin;
        let dias = 0;

        switch (name) {
            case 'fechaInicio': inicio = value; break;
            case 'fechaFin':    fin = value;    break;
        }

        if (inicio && fin && precio) {
            const dtInicio = new Date(inicio);
            const dtFin = new Date(fin);
            dias = (dtFin.getDate() - dtInicio.getDate()) + 1;
        }

        editarAlquiler({
            ...alquiler,
            fechaInicio: inicio,
            fechaFin: fin,
            precio: precio,
            efectivo: precio > 0 && dias > 0 ? precio * dias : 0.00
        } as Alquiler)
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

        if (!alquiler || !agregar) {
            setValidated(true);
            return;
        }

        const resp = await agregar({
            ...alquiler,
            persona: persona,
            vehiculo: vehiculo
        });
        if (resp && resp.ok) {
            Exito('Este vehículo ha sido alquilado exitosamente!.')
        } else {
            Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del alquiler del vehiculo.')
        }
    }

    useEffect(() => {
        if (nuevo) {
            nuevo();
        }
        cargar();
    }, [])

    useEffect(() => {
        if (editando) {
            editarAlquiler(modelo);
            (async () => {
                cargarProvincias && await cargarProvincias(null);
                cargarMunicipios && await cargarMunicipios(null);
            })()
        }
    }, [editando])

    return (
        <>
            <Container as={Col} className="mt-4 mb-3 col-md-9">
                <Row>
                    <Col className="mb-3">
                        <h1 className="fs-2 fw-lighter m-0">Registro de Alquiler</h1>
                    </Col>
                    <Col xs="auto" className="mb-3">
                        <Button type="submit" variant="primary" form="formalquiler">Alquilar</Button>
                    </Col>
                </Row>
                <hr />

                <Row>
                    <Col xs={12} className="mb-5">
                        <h1 className="fs-3 fw-bolder">Veh&iacute;culo</h1>
                        {
                            vehiculo
                                ? <VehiculoAlquiler key={vehiculo.codigo} Item={vehiculo} Alquilar={false} />
                                : <></>
                        }
                    </Col>
                </Row>

                <Form id="formalquiler" noValidate validated={validated} onSubmit={guardar}>

                    <h1 className="fs-4 fw-bolder text-primary m-0">Mis Datos</h1>
                    <hr className="my-3" />
                    <Row>
                        <Col md={6} className="align-self-end mb-4">
                            <Row>
                                <Col xs={6}>
                                    <Form.Check
                                        id="esCedula"
                                        type="switch"
                                        label="Cédula"
                                        checked={persona?.esCedula}
                                        onChange={() => {
                                            editarPersona({ ...persona, esCedula: true } as Persona)
                                        }} />
                                </Col>
                                <Col xs={6}>
                                    <Form.Check
                                        id="esPasaporte"
                                        type="switch"
                                        label="Pasaporte"
                                        checked={!persona?.esCedula}
                                        onChange={() => {
                                            editarPersona({ ...persona, esCedula: false } as Persona)
                                        }} />
                                </Col>
                                <Form.Group as={Col} xs={12}>
                                    <Form.Control
                                        id="documento"
                                        name="documento"
                                        type="text"
                                        autoComplete="off"
                                        className="border-0 border-bottom rounded-0"
                                        required
                                        value={persona?.documento || ''}
                                        onChange={handleChangeInputPersona} />
                                    <Form.Control.Feedback type="invalid" className="fw-bolder">
                                        Obligatorio
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Col>
                        <Form.Group as={Col} md={6} className="mb-4">
                            <Form.Label className="mb-1">No. Licencia</Form.Label>
                            <Form.Control
                                id="licencia"
                                name="licencia"
                                type="text"
                                autoComplete="off"
                                className="border-0 border-bottom rounded-0"
                                required
                                value={persona?.licencia || ''}
                                onChange={handleChangeInputPersona} />
                            <Form.Control.Feedback type="invalid" className="fw-bolder">
                                Obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={12} className="mb-4">
                            <Form.Label className="mb-1">Nombres y Apellidos</Form.Label>
                            <Form.Control
                                id="nombre"
                                name="nombre"
                                type="text"
                                autoComplete="off"
                                className="border-0 border-bottom rounded-0"
                                required
                                value={persona?.nombre || ''}
                                onChange={handleChangeInputPersona} />
                            <Form.Control.Feedback type="invalid" className="fw-bolder">
                                Obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Col md={6} className="mb-3">
                            <Form.Label className="mb-1">Provincia</Form.Label>
                            <Form.Select
                                name="provincia"
                                className="border-0 border-bottom rounded-0"
                                required
                                defaultValue={persona?.municipio?.provincia?.id}
                                onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                    const nuevaProvincia = provincias.filter(prov => prov.id === parseInt(evt.target.value))[0];
                                    editarPersona({
                                        ...persona,
                                        municipio: {
                                            ...persona?.municipio,
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
                            </Form.Select >
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Label className="mb-1">Municipio</Form.Label>
                            <Form.Select
                                name="municipio"
                                className="border-0 border-bottom rounded-0"
                                required
                                defaultValue={persona?.municipio?.id}
                                onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                    const nuevopMunicipio = municipios.filter(mun => mun.id === parseInt(evt.target.value))[0];
                                    editarPersona({
                                        ...persona,
                                        municipio: nuevopMunicipio
                                    } as Persona);
                                }}>
                                <option value=""></option>
                                {
                                    municipios
                                        .filter(mun => mun.provincia?.id === persona?.municipio?.provincia?.id)
                                        .map((provincia) => {
                                            return (
                                                <option key={provincia.id} value={provincia.id}>
                                                    {provincia.nombre}
                                                </option>
                                            );
                                        })}
                            </Form.Select >
                        </Col>
                        <Col xs={12} className="mb-4">
                            <Form.Label className="mb-1">Direcci&oacute;n</Form.Label>
                            <Form.Control
                                id="direccion"
                                name="direccion"
                                type="text"
                                autoComplete="off"
                                className="border-0 border-bottom rounded-0"
                                required
                                value={persona?.direccion || ''}
                                onChange={handleChangeInputPersona} />
                        </Col>
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Label className="mb-1">Tel&eacute;fono Celular</Form.Label>
                            <Form.Control
                                id="telefono1"
                                name="telefono1"
                                type="text"
                                autoComplete="off"
                                className="border-0 border-bottom rounded-0"
                                required
                                value={persona?.telefono1 || ''}
                                onChange={handleChangeInputPersona} />
                        </Col>
                        <Col md={6} xs={12} className="mb-4">
                            <Form.Label className="mb-1">Tel&eacute;fono Residencia</Form.Label>
                            <Form.Control
                                id="telefono2"
                                name="telefono2"
                                type="text"
                                autoComplete="off"
                                className="border-0 border-bottom rounded-0"
                                value={persona?.telefono2 || ''}
                                onChange={handleChangeInputPersona} />
                        </Col>
                    </Row>

                    <h1 className="fs-4 fw-bolder text-primary m-0">Alquiler</h1>
                    <hr className="my-3" />
                    <Row>
                        <Col md={6} sm={6} xs={12}>
                            <Row>
                                <Col xs={12} className="mb-4">
                                    <Form.Label className="mb-1">Fecha Inicio</Form.Label>
                                    <Form.Control
                                        id="fechaInicio"
                                        name="fechaInicio"
                                        type="date"
                                        className="border-0 border-bottom rounded-0"
                                        required
                                        value={alquiler?.fechaInicio || ''}
                                        onChange={calculaPrecio} />
                                </Col>
                                <Col xs={12} className="mb-4">
                                    <Form.Label className="mb-1">Fecha Fín</Form.Label>
                                    <Form.Control
                                        id="fechaFin"
                                        name="fechaFin"
                                        type="date"
                                        className="border-0 border-bottom rounded-0"
                                        required
                                        value={alquiler?.fechaFin || ''}
                                        onChange={calculaPrecio} />
                                </Col>
                                <Col md sm={12} xs={12} className="mb-4">
                                    <InputGroup>
                                        <InputGroup.Text className="border-0 border-end bg-transparent">
                                            <Form.Check
                                                id="enEfectivo"
                                                type="switch"
                                                label="Efectivo"
                                                checked={alquiler?.enEfectivo}
                                                onChange={() => {
                                                    editarAlquiler({ ...alquiler, enEfectivo: true } as Alquiler)
                                                }} />
                                        </InputGroup.Text>
                                        <InputGroup.Text className="border-0 bg-transparent">
                                            <Form.Check
                                                id="enDeposito"
                                                type="switch"
                                                label="Depósito en Banco"
                                                checked={!alquiler?.enEfectivo}
                                                onChange={() => {
                                                    editarAlquiler({ ...alquiler, enEfectivo: false } as Alquiler)
                                                }} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={12} className="mb-4">
                                    <div className="w-100 bg-primary text-white text-center fs-2">
                                        RD$ <span className="fw-bold">{FormatNumber(alquiler?.efectivo || 0, 0)}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} sm={6} xs={12}>
                            <Row>
                                <Col xs={12} className="mb-3">
                                    <Form.Label className="mb-1">Comprobante</Form.Label>
                                    <Form.Control type="file" name="comprobante" required={!alquiler?.enEfectivo} onChange={handleChangeInputAlquiler} accept=".jpg, .jpeg, .png" />
                                </Col>
                                <Col xs={12} className="mb-3">
                                    {
                                        !alquiler?.comprobante
                                            ?
                                            <div className="img-thumbnail position-relative" style={{ paddingTop: '100%' }}>
                                                <BsReceipt className="position-absolute text-secondary h-75 w-auto"
                                                    style={{
                                                        top: '12.5%',
                                                        left: '12.5%'
                                                    }} />
                                            </div>
                                            :
                                            <div className="img-thumbnail" style={{
                                                paddingTop: '100%',
                                                background: `url(${alquiler?.comprobante.imagen})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            }} />
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Form>
            </Container>
            <Loading Visible={false} Mensaje="procesando, espere..." />
        </>
    )
}
export default AlquilerRegistroPage;
