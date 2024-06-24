import { Button, Col, Row } from "react-bootstrap";
import { Vehiculo } from "../../interfaces/entidades/vehiculo";
import { FormatNumber } from "../../hooks/useUtils";
import { BsFuelPump } from "react-icons/bs";
import { GiMechanicalArm } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { useData } from "../../hooks/useData";
import { useNavigate } from "react-router";
import { rutas } from "../../components/rutas";
import Accesorios from "./accesorios";
import Imagen from "../../components/imagen";

type VehiculoAlquilerProps = {
    Item: Vehiculo,
    Alquilar: boolean
}

const VehiculoDetalle = (props: VehiculoAlquilerProps) => {
    const { contextAuth: { state: { user } } } = useData();
    const { Item, Alquilar } = props;
    const nav = useNavigate();

    return (
        <Col key={Item.codigo} lg={4} md={6} sm={6} xs={12}>
            <Imagen Item={Item.foto}>
                <span className="position-absolute start-0 top-0 bg-primary text-white fs-5 fw-bolder rounded px-2">{`RD$ ${FormatNumber(Item.precio, 2)}`}</span>
            </Imagen>
            <Row>
                <Col xs={12}>
                    <h5 className="fw-bolder text-center my-3">{`${Item.modelo?.marca.nombre} ${Item.modelo?.nombre}`}</h5>
                </Col>
                <Col md={4} sm={4} xs={4} className="d-flex flex-column align-items-center">
                    <GiMechanicalArm className="fs-3" />
                    <span>{Item.transmision?.nombre}</span>
                </Col>
                <Col md={4} sm={4} xs={4} className="d-flex flex-column align-items-center">
                    <BsFuelPump className="fs-3" />
                    <span>{Item.combustible?.nombre}</span>
                </Col>
                <Col md={4} sm={4} xs={4} className="d-flex flex-column align-items-center">
                    <IoSpeedometerOutline className="fs-3" />
                    <span>{`${FormatNumber(Item.uso, 0)} ${Item.enKilometros ? '(km)' : '(mi)'}`}</span>
                </Col>
            </Row>
            {
                Item.accesorios && Item.accesorios.length === 0
                    ? <></>
                    :
                    <>
                        <hr />
                        <Accesorios Items={Item.accesorios} />
                    </>
            }
            <hr />
            <Row>
                <Col md={6} sm={6} xs={6}>
                    <span className="fs-4 fw-bolder text-primary">{FormatNumber(Item.precio, 2)}</span>
                </Col>
                <Col md={6} sm={6} xs={6} className="text-end">
                    {
                        user && !Alquilar // propietario
                            ?
                            <Button type="button" variant="outline-secondary" className="rounded-0"
                                onClick={() => {
                                    nav(`/${rutas.Alquileres.Registro.replace(':codigo', Item.codigo || '')}`);
                                }}>
                                Editar
                            </Button>
                            : (!user && Alquilar) || (user && Alquilar) // Usuario de alquiler o un propietario que esta alquilando
                                ?
                                <Button type="button" variant="outline-primary" className="rounded-0"
                                    onClick={() => {
                                        nav(`/${rutas.Alquileres.Registro.replace(':codigo', Item.codigo || '')}`);
                                    }}>
                                    Alquilar
                                </Button>
                                : <></>
                    }
                </Col>
            </Row >
        </Col >
    )
}
export default VehiculoDetalle;
