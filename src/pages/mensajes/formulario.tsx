import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { Usuario } from "../../interfaces/entidades/usuario";
import { useData } from "../../hooks/useData";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { ChangeEvent, useEffect, useState } from "react";
import { Mensaje } from "../../interfaces/entidades/mensaje";
import { FaTelegramPlane } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { BsBodyText, BsAlphabet } from "react-icons/bs";

type MensajeProps = {
    Flotante: boolean
}
const MensajeFormulario = (props: MensajeProps) => {
    const { contextMensajes: { state: { modelo, editando }, cancelar } } = useData();
    const { Flotante } = props;

    if (!modelo) {
        return <></>
    }

    if (!Flotante) {
        return (
            <Formulario />
        )
    }

    return (
        <Modal show={editando} onHide={cancelar} centered scrollable>
            <Modal.Header className="bg-primary text-white py-2">
                <Modal.Title>
                    <span className="fw-lighter">Mensaje</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formulario />
            </Modal.Body>
        </Modal>
    )
}
export default MensajeFormulario;

const Formulario = () => {
    const {
        contextMensajes: { state: { modelo, editando }, nuevo, agregar }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Mensaje | null | undefined>(modelo);
    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        if (modelo) {
            editar(modelo);
        }
    }, [modelo])

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

        const res = await agregar(entidad);
        if (!res) {
            Alerta("Situación inesperada tratando de guardar los datos del mensaje.");
        } else if (!res.ok) {
            Alerta(res.mensaje || 'No fue posible guardar los datos del mensaje.');
        } else {
            Exito('Mensaje registrado exitosamente!');
            nuevo && nuevo();
        }
    }

    return (
        <Form id="formalquiler" autoComplete="off" noValidate validated={validated} onSubmit={guardar}>
            <Row className="g-2">
                <Form.Group as={Col} md={12} className="mb-3 position-relative">
                    <div className="d-flex align-items-center">
                        <BsAlphabet className="fs-5 text-secondary me-2" />
                        <span className="fs-6 fw-bolder mb-1">Nombre</span>
                    </div>
                    <Form.Control
                        type="text"
                        name="nombre"
                        className="border-0 border-bottom rounded-0"
                        placeholder="escriba aquí su nombre"
                        required
                        value={entidad?.nombre || ''}
                        onChange={handleChangeInput} />
                    <Form.Control.Feedback tooltip type="invalid" className="fw-bolder py-0">
                        Obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={12} className="mb-3 position-relative">
                    <div className="d-flex align-items-center">
                        <GoMail className="fs-5 text-secondary me-2" />
                        <span className="fs-6 fw-bolder mb-1">Correo</span>
                    </div>
                    <Form.Control
                        type="email"
                        name="correo"
                        className="border-0 border-bottom rounded-0"
                        placeholder="escriba aquí su correo electrónico"
                        required
                        value={entidad?.correo || ''}
                        onChange={handleChangeInput} />
                    <Form.Control.Feedback tooltip type="invalid" className="fw-bolder py-0">
                        Obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={12} className="mb-3 position-relative">
                    <div className="d-flex align-items-center">
                        <BsBodyText className="fs-5 text-secondary me-2" />
                        <span className="fs-6 fw-bolder mb-1">Comentario {`(${entidad?.comentario?.length || 0} de 500)`}</span>
                    </div>
                    <Form.Control
                        name="comentario"
                        as="textarea"
                        rows={5}
                        className="border-0 border-bottom rounded-0"
                        placeholder="escriba aquí su comentario"
                        required
                        value={entidad?.comentario || ''}
                        onChange={handleChangeInput} />
                    <Form.Control.Feedback tooltip type="invalid" className="fw-bolder py-0">
                        Obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Col md={12} className="mb-3">
                    <Button type="submit" variant="primary" className="rounded-pill d-flex align-items-center">
                        <FaTelegramPlane className="me-3" />
                        Enviar Mensaje
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
