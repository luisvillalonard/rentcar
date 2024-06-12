import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { Vehiculo } from "../../interfaces/entidades/vehiculo";
import { BsPlus, BsSave } from "react-icons/bs";
import { useData } from "../../hooks/useData";
import { ChangeEvent, useEffect, useRef } from "react";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { Accesorio } from "../../interfaces/entidades/accesorio";

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
    const refFile = useRef<HTMLInputElement>(null);

    const checkAccesorio = (item: Accesorio, checked: boolean) => {
        const pos: number = entidad?.accesorios.findIndex(acc => acc.id === item.id && checked) as number;
        if (pos < 0 && checked) {
            editar({
                ...entidad,
                accesorios: [ ...entidad?.accesorios as Accesorio[], item ]
            } as Vehiculo)
        } else if (!checked) {
            editar({
                ...entidad,
                accesorios: entidad?.accesorios.filter(acc => acc.id !== item.id)
            } as Vehiculo)
        }
    }

    const guardar = async () => {

        if (!entidad)
            return

        if (agregar) {
            const resp = await agregar(entidad)
            if (resp) {
                if (resp.ok) {
                    Exito('Su vehiculo ha sido registrado con éxito!.')
                } else {
                    Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del vehículo.')
                }
            }
        }
    }

    useEffect(() => {
        if (nuevo) {
            nuevo()
        }
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
            <h1 className="fs-2 fw-lighter mb-4">Registro de Veh&iacute;culo</h1>

            <Card className="shadow-sm mb-4">
                <Card.Body className="pb-1">
                    <Row>
                        <Col md className="mb-3">
                            <Button variant="primary" className="rounded-pill align-self-center" onClick={guardar}>
                                <BsSave className="me-2" />
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Label className="fs-6">Tipo</Form.Label>
                            <Form.Select
                                id="tipo"
                                required
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
                            <Form.Label className="fs-6">Marca</Form.Label>
                            <Form.Select
                                id="marca"
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
                            <Form.Label className="fs-6">Modelo</Form.Label>
                            <Form.Select
                                id="modelo"
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
                            <Form.Label className="fs-6">Combustible</Form.Label>
                            <Form.Select
                                id="combustible"
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
                            <Form.Label className="fs-6">Transmisi&oacute;n</Form.Label>
                            <Form.Select
                                id="transmision"
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
                            <Form.Label className="fs-6">Tracciones</Form.Label>
                            <Form.Select
                                id="traccion"
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
                            <Form.Label className="fs-6">Motor</Form.Label>
                            <Form.Select
                                id="motor"
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
                            <Form.Label className="fs-6">Uso</Form.Label>
                            <Form.Control
                                id="uso"
                                name="uso"
                                type="number"
                                required
                                value={entidad?.uso || 0}
                                onChange={handleChangeInput} />
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
                            <Form.Label className="fs-6">Carga</Form.Label>
                            <Form.Select
                                id="carga"
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
                            <Form.Label className="fs-6">Color Interior</Form.Label>
                            <Form.Select
                                id="interior"
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
                            <Form.Label className="fs-6">Color Exterior</Form.Label>
                            <Form.Select
                                id="exterior"
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
                            <Form.Label className="fs-6">Puertas</Form.Label>
                            <Form.Select
                                id="puertas"
                                name="puertas"
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
                            <Form.Label className="fs-6">Pasajeros</Form.Label>
                            <Form.Select
                                id="pasajeros"
                                name="pasajeros"
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
                            <Form.Label className="fs-6">Precio x D&iacute;a (RD$)</Form.Label>
                            <Form.Control
                                id="precio"
                                name="precio"
                                type="number"
                                required
                                value={entidad?.precio || 0}
                                onChange={handleChangeInput} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <h1 className="fs-4 fw-lighter m-0">Accesorios</h1>
                    <hr className="my-4" />

                    <Row>
                        {
                            accesorios && accesorios.map((acc) => {
                                return (
                                    <Col md={3} sm={3} xs={6}>
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
                </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Row>
                        <Col md sm className="align-self-center">
                            <h1 className="fs-4 fw-lighter m-0">Fotos</h1>
                        </Col>
                        <Col md="auto" sm="auto">
                            <input type="file" name="fotos" className="d-none" ref={refFile} onChange={handleChangeInput} multiple accept=".jpg, .jpeg, .png" />
                            <Button variant="primary" size="sm" className="rounded-pill align-self-center" onClick={() => refFile.current?.click()}>
                                <BsPlus className="me-2" />
                                Agregar
                            </Button>
                        </Col>
                    </Row>
                    <hr />

                    <Row>
                        {
                            entidad?.fotos && entidad.fotos.map((foto) => {
                                return (
                                    <Col md={2} sm={2} xs={6}>
                                        <div className="img-thumbnail" style={{
                                            paddingTop: '100%',
                                            background: `url(${foto.imagen as string})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center'
                                        }} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default VehiculoPage;
