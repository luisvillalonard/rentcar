import { Button, Col, Row } from "react-bootstrap";
import { Accesorio } from "../../interfaces/entidades/accesorio";
import { BsCheck2 } from "react-icons/bs";
import { useState } from "react";

type AccesoriosProps = {
    Items: Accesorio[]
}

const Accesorios = (props: AccesoriosProps) => {
    const { Items } = props;
    const esLargo: boolean = Items.length > 8;
    const shortItems = Items.slice(0, 7);
    const [verMas, setVerMas] = useState<boolean>(false);

    if (Items.length === 0)
        return <></>

    if (esLargo && !verMas) {
        return (
            <Row>
                {
                    shortItems.map(acc => {
                        return <Col key={acc.id} md={6} sm={6} xs={6} className="align-self-center">
                            <div className="d-flex flex-row">
                                <div>
                                    <BsCheck2 className="me-1" />
                                </div>
                                <div className="flex-grow-1">{acc.nombre}</div>
                            </div>
                        </Col>
                    })
                }
                <Col md={6} sm={6} xs={6} className="align-self-center">
                    <Button variant="link" className="text-decoration-none p-0" onClick={() => setVerMas(true)}>ver mas</Button>
                </Col>
            </Row>
        )
    }

    return (
        <Row>
            {
                Items.map(acc => {
                    return <Col key={acc.id} md={6} sm={6} xs={6} className="align-self-center">
                        <div className="d-flex flex-row">
                            <div>
                                <BsCheck2 className="me-1" />
                            </div>
                            <div className="flex-grow-1">{acc.nombre}</div>
                        </div>
                    </Col>
                })
            }
            <Col md={6} sm={6} xs={6} className="align-self-center">
                <Button variant="link" className="text-decoration-none p-0" onClick={() => setVerMas(false)}>ver menos</Button>
            </Col>
        </Row>
    )
}
export default Accesorios;
