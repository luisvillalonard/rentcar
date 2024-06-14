import { Badge, Button, Card, Col, Container, Form, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { Vehiculo } from "../../interfaces/entidades/vehiculo";
import { BsPlus } from "react-icons/bs";
import { useData } from "../../hooks/useData";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { Accesorio } from "../../interfaces/entidades/accesorio";
import Imagen from "../../components/imagen";

const VehiculoPage = () => {
    const {
        contextAuth: { state: { user } },
        contextVehiculos: { state: { modelo, editando, procesando }, nuevo, agregar, actualizar },
        contextVehiculosTipos: { state: { datos: vehiculosTipos, procesando: cargandoVehiculosTipos }, todos: cargarVehiculosTipos },
        contextAccesorios: { state: { datos: accesorios, procesando: cargandoAccesorios }, todos: cargarAccesorios },
        contextMarcas: { state: { datos: marcas, procesando: cargandoMarcas }, todos: cargarMarcas },
        contextModelos: { state: { datos: modelos, procesando: cargandoModelos }, todos: cargarModelos },
        contextCombustibles: { state: { datos: combustibles, procesando: cargandoCombustibles }, todos: cargarCombustibles },
        contextTransmisiones: { state: { datos: transmisiones, procesando: cargandoTransmisiones }, todos: cargarTransmisiones },
        contextTracciones: { state: { datos: tracciones, procesando: cargandoTracciones }, todos: cargarTracciones },
        contextColores: { state: { datos: colores, procesando: cargandoColores }, todos: cargarColores },
        contextMotores: { state: { datos: motores, procesando: cargandoMotores }, todos: cargarMotores },
        contextCargas: { state: { datos: cargas, procesando: cargandoCargas }, todos: cargarCargas }
    } = useData();
    const { entidad, editar, handleChangeInput, handleChangeSelect } = useForm<Vehiculo | null | undefined>(null);
    const [validated, setValidated] = useState<boolean>(false);
    const refFile = useRef<HTMLInputElement>(null);

    const checkAccesorio = (item: Accesorio, checked: boolean) => {
        const pos: number = entidad?.accesorios.findIndex(acc => acc.id === item.id && checked) as number;
        if (pos < 0 && checked) {
            editar({
                ...entidad,
                accesorios: [...entidad?.accesorios as Accesorio[], item]
            } as Vehiculo)
        } else if (!checked) {
            editar({
                ...entidad,
                accesorios: entidad?.accesorios.filter(acc => acc.id !== item.id)
            } as Vehiculo)
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

        if (!entidad || !agregar) {
            setValidated(true);
            return;
        }

        const resp = await agregar(entidad)
        if (resp && resp.ok) {
            Exito('Su vehiculo ha sido registrado con éxito!.')
        } else {
            Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del vehículo.')
        }
    }

    useEffect(() => {
        nuevo && nuevo()
    }, [])

    useEffect(() => {
        if (editando) {
            editar({ ...modelo, propietario: user?.propietario } as Vehiculo);
            (async () => {
                cargarAccesorios && await cargarAccesorios(null);
                cargarVehiculosTipos && await cargarVehiculosTipos(null);
                cargarMarcas && await cargarMarcas(null);
                cargarModelos && await cargarModelos(null);
                cargarCombustibles && await cargarCombustibles(null);
                cargarTransmisiones && await cargarTransmisiones(null);
                cargarTracciones && await cargarTracciones(null);
                cargarColores && await cargarColores(null);
                cargarMotores && await cargarMotores(null);
                cargarMotores && await cargarMotores(null);
                cargarCargas && await cargarCargas(null);
            })()
        }
    }, [editando])

    return (
        <Container className="my-4">
            <Col lg={10} md={10} xs={12} className="mx-auto">
                <Row>
                    <Col md xs className="align-self-center mb-3">
                        <h1 className="fs-2 fw-light m-0">Registro de Veh&iacute;culo</h1>
                    </Col>
                    <Col md="auto" xs="auto" className="align-self-center mb-3">
                        <Button type="submit" variant="primary" className="rounded-pill align-self-center" form="formvehiculo">
                            Guardar
                        </Button>
                    </Col>
                </Row>

                <hr className="mt-3 mb-4 pb-1" />

                <Form id="formvehiculo" noValidate validated={validated} onSubmit={guardar}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="generales">
                        <Nav fill variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="generales" className="fs-5">Generales</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="accesorios" className="align-self-center">
                                    <span className="fs-5 me-2">Accesorios</span>
                                    {
                                        entidad?.fotos.length === 0
                                            ? <Badge pill bg="secondary">{entidad?.accesorios.length}</Badge>
                                            : <Badge pill bg="primary">{entidad?.accesorios.length}</Badge>
                                    }
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fotos" className="align-self-center">
                                    <span className="fs-5 me-2">Fotos</span>
                                    {
                                        entidad?.fotos.length === 0
                                            ? <Badge pill bg="secondary">{entidad?.fotos.length}</Badge>
                                            : <Badge pill bg="primary">{entidad?.fotos.length}</Badge>
                                    }
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="generales" className="py-4 px-2">
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Tipo</Form.Label>
                                        <Form.Select
                                            id="tipo"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            autoFocus={true}
                                            defaultValue={entidad?.tipo?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoTipo = vehiculosTipos.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    tipo: nuevoTipo
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {vehiculosTipos.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Marca</Form.Label>
                                        <Form.Select
                                            id="marca"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.marca?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevaMarca = marcas.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    marca: nuevaMarca
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {marcas.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Modelo</Form.Label>
                                        <Form.Select
                                            id="modelo"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.modelo?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoModelo = modelos.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    modelo: nuevoModelo
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {
                                                modelos
                                                    .filter(mod => mod.marca.id === entidad?.marca?.id)
                                                    .map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)
                                            }
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Combustible</Form.Label>
                                        <Form.Select
                                            id="combustible"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.combustible?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoComb = combustibles.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    combustible: nuevoComb
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {combustibles.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Transmisi&oacute;n</Form.Label>
                                        <Form.Select
                                            id="transmision"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.transmision?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevaTrans = transmisiones.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    transmision: nuevaTrans
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {transmisiones.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Tracciones</Form.Label>
                                        <Form.Select
                                            id="traccion"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.traccion?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevaTracc = tracciones.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    traccion: nuevaTracc
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {tracciones.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Motor</Form.Label>
                                        <Form.Select
                                            id="motor"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.motor?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoMotor = motores.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    motor: nuevoMotor
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {motores.map(item => <option key={item.id} value={item.id}>{item.descripcion}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Uso</Form.Label>
                                        <Form.Control
                                            id="uso"
                                            name="uso"
                                            type="number"
                                            className="border-0 border-bottom rounded-0 input-not-spin"
                                            required
                                            value={entidad?.uso || 0}
                                            onChange={handleChangeInput}
                                            onFocus={(e) => e.target.select()} />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Check
                                            id="enKilometros"
                                            type="switch"
                                            label="En Kilometros"
                                            checked={entidad?.enKilometros}
                                            onChange={() => {
                                                editar({ ...entidad, enKilometros: true, enMillas: false } as Vehiculo)
                                            }} />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Check
                                            id="enMillas"
                                            type="switch"
                                            label="En Millas"
                                            checked={entidad?.enMillas}
                                            onChange={() => {
                                                editar({ ...entidad, enMillas: true, enKilometros: false } as Vehiculo)
                                            }} />
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Carga</Form.Label>
                                        <Form.Select
                                            id="carga"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.carga?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevaCarga = cargas.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    carga: nuevaCarga
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {cargas.map(item => <option key={item.id} value={item.id}>{item.descripcion}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Color Interior</Form.Label>
                                        <Form.Select
                                            id="interior"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.interior?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoInt = colores.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    interior: nuevoInt
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {colores.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Color Exterior</Form.Label>
                                        <Form.Select
                                            id="exterior"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.exterior?.id}
                                            onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                                const nuevoExt = colores.filter(item => item.id === parseInt(evt.target.value))[0];
                                                editar({
                                                    ...entidad,
                                                    exterior: nuevoExt
                                                } as Vehiculo);
                                            }}>
                                            <option value=""></option>
                                            {colores.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Puertas</Form.Label>
                                        <Form.Select
                                            id="puertas"
                                            name="puertas"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            defaultValue={entidad?.puertas}
                                            onChange={handleChangeSelect}>
                                            <option value=""></option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </Form.Select >
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Pasajeros</Form.Label>
                                        <Form.Select
                                            id="pasajeros"
                                            name="pasajeros"
                                            className="border-0 border-bottom rounded-0"
                                            required
                                            value={entidad?.pasajeros}
                                            onChange={handleChangeSelect}>
                                            <option value=""></option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="mb-1">Precio x D&iacute;a (RD$)</Form.Label>
                                        <Form.Control
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            className="border-0 border-bottom rounded-0 input-not-spin"
                                            required
                                            value={entidad?.precio || 0}
                                            onChange={handleChangeInput}
                                            onFocus={(e) => e.target.select()} />
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="accesorios" className="py-4 px-2">
                                <Row>
                                    {
                                        accesorios && accesorios.map((acc, pos) => {
                                            return (
                                                <Col key={pos} md={3} sm={3} xs={6}>
                                                    <Form.Check
                                                        id={`${acc.id}_${acc.nombre}`}
                                                        type="switch"
                                                        label={acc.nombre}
                                                        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                                                            checkAccesorio(acc, evt.target.checked)
                                                        }} />
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fotos" className="py-4 px-2">
                                <Container className="mb-3">
                                    <input type="file" name="fotos" className="d-none" ref={refFile} onChange={handleChangeInput} multiple accept=".jpg, .jpeg, .png" />
                                    <Button variant="primary" size="sm" className="rounded-pill align-self-center" onClick={() => refFile.current?.click()}>
                                        <BsPlus className="me-2" />
                                        Agregar
                                    </Button>
                                </Container>
                                <Row>
                                    {
                                        entidad?.fotos && entidad.fotos.map((foto, pos) => {
                                            return (
                                                <Col key={pos} md={2} sm={2} xs={6}>
                                                    <Imagen Item={foto}></Imagen>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Form>
            </Col >
        </Container >
    )
}
export default VehiculoPage;
