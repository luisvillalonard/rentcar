import { BsCheckCircleFill, BsDashCircleFill } from 'react-icons/bs';

type EstadoProps = {
    valor: boolean,
    textoPositivo?: string,
    textoNegativo?: string,
    colorPositivo?: string,
    colorNegativo?: string,
}

const Estado = (props: EstadoProps) => {
    const { valor, textoPositivo, textoNegativo, colorPositivo, colorNegativo } = props;

    return (
        <div className="d-flex align-items-center">
            <div className="d-flex flex-row align-items-center m-auto">
                {
                    valor === true
                        ?
                        <>
                            <BsCheckCircleFill className={`me-2 ${colorPositivo === null ? 'text-success' : colorPositivo}`} />
                            <span>{textoPositivo || "Activo"}</span>
                        </>
                        :
                        <>
                            <BsDashCircleFill className={`me-2 ${colorNegativo === null ? 'text-secondary opacity-50' : colorNegativo}`} />
                            <span className="text-secondary">{textoNegativo || "Inactivo"}</span>
                        </>
                }
            </div>
        </div>
    )
}
export default Estado;
