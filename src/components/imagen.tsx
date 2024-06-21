import { ChangeEvent, useState } from "react";
import { Foto } from "../interfaces/entidades/foto";
import { MdOutlineNoPhotography, MdOutlinePhoto } from "react-icons/md";

type ImagenProps = {
    Item: Foto | null | undefined,
    children?: JSX.Element | JSX.Element[] | string
}

const Imagen = (props: ImagenProps) => {
    const { Item, children } = props;
    const [alto, setAlto] = useState<number>(0);
    const [ancho, setAncho] = useState<number>(0);

    return (
        <div className="mg-fluid img-thumbnail position-relative" style={{ paddingTop: '100%' }}>
            {
                children
                    ? children
                    : <></>
            }
            <div className="position-absolute w-100 h-100 start-0 top-0 d-flex overflow-hidden">
                {
                    !Item
                    ? <MdOutlineNoPhotography className="position-absolute text-secondary h-75 w-auto" style={{ top: '12.5%', left: '12.5%' }} />
                    : <img
                        src={Item?.imagen as string}
                        className={`m-auto ${ancho > alto ? 'w-100 h-auto' : alto > ancho ? 'w-auto h-100' : 'w-100 h-auto'} rounded`}
                        onLoad={(evt: ChangeEvent<HTMLImageElement>) => {
                            setAncho(evt.currentTarget.naturalWidth); 
                            setAlto(evt.currentTarget.naturalHeight);
                        }} />
                }
            </div>
        </div>
    )
}
export default Imagen;
