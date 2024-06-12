import { Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { Usuario } from "../../interfaces/entidades/usuario";
import { useData } from "../../hooks/useData";
import { Alerta, Exito } from "../../hooks/useMensaje";
import { ChangeEvent, useEffect, useState } from "react";

const UsuarioFormulario = () => {
    const { 
        contextUsuarios: { state: { modelo, editando }, agregar, actualizar, cancelar },
        contextRoles: { state: { datos: roles, procesando: CargandoRoles }, todos }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Usuario | null | undefined>(modelo);
    
    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => { todos && await todos(null); })()
        }
    }, [modelo])

    const Guardar = async () => {

        if (!entidad || !agregar || !actualizar)
            return;

        let res;
        let esNuevo = entidad.id === 0 ? true : false;

        if (esNuevo)
            res = await agregar(entidad);
        else {
            res = await actualizar(entidad);
        }

        if (!res) {
            Alerta("Situación inesperada tratando de guardar los datos del usuario.");
        } else if (!res.ok) {
            Alerta(res.mensaje || 'No fue posible guardar los datos del usuario.');
        } else {
            if (esNuevo) {
                Exito('Usuario agregado exitosamente!');
            } else {
                Exito('Usuario actualizado exitosamente!');
            }
        }
    }

    if (!editando) {
        return <></>
    }

    console.log(entidad)
    return (
        <Modal show={true} onHide={cancelar} centered scrollable>
            <Modal.Header className="bg-primary text-white">
                <span className="fw-lighter">Usuario</span>
            </Modal.Header>
            <Modal.Body>
                <Form id="formUsuario" autoComplete="off">
                    <Row className="g-2">
                        <Col md={12} className="mb-2">
                            <label className="form-label mb-1">Acceso</label>
                            <Form.Control
                                type="text"
                                name="acceso"
                                required
                                value={entidad?.acceso || ''}
                                onChange={handleChangeInput} />
                        </Col>
                        <Col md={12} className="mb-2">
                            <label className="form-label mb-1">Rol</label>
                            <Form.Select
                                required
                                defaultValue={entidad?.rol?.id}
                                onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
                                    const nuevoRol = roles.filter(rol => rol.id === parseInt(evt.target.value))[0];
                                    editar({ ...entidad, rol: nuevoRol } as Usuario);
                                }}>
                                <option value=""></option>
                                {roles.map((rol) => {
                                    return (
                                        <option key={rol.id} value={rol.id}>
                                            {rol.nombre}
                                        </option>
                                    );
                                })}
                            </Form.Select >
                        </Col>
                        {
                            entidad?.id === 0
                                ? <></>
                                :
                                <>
                                    <Col md={12} className="mb-2">
                                        <Form.Check
                                            type="switch"
                                            id="cambio"
                                            label="Este usuario cambió su contraseña"
                                            checked={entidad?.cambio}
                                        />
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <Form.Check
                                            type="switch"
                                            id="activo"
                                            label={entidad?.activo ? "Activo" : "Inactivo"}
                                            checked={entidad?.cambio}
                                        />
                                    </Col>
                                </>
                        }
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-default rounded-pill" onClick={cancelar}>Cancelar</button>
                <button type="button" form="formUsuario" className="btn btn-primary rounded-pill ms-auto" onClick={Guardar}>Guardar</button>
            </Modal.Footer>
        </Modal>
    )
}
export default UsuarioFormulario;
