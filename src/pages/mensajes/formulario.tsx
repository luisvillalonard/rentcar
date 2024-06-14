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

const MensajeFormulario = () => {
    const {
        contextMensajes: { state: { modelo, editando }, nuevo, agregar }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Mensaje | null | undefined>(modelo);
    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        nuevo && nuevo();
    }, [])

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

    console.log(entidad)
    return (
        <Form id="formalquiler" autoComplete="off" noValidate validated={validated} onSubmit={guardar}>
            <Row className="g-2">
                <Col md={12} className="mb-3">
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
                </Col>
                <Col md={12} className="mb-3">
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
                </Col>
                <Col md={12} className="mb-3">
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
                </Col>
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
export default MensajeFormulario;
