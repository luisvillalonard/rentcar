import { Foto } from "../interfaces/entidades/foto";
import { MdOutlineNoPhotography } from "react-icons/md";

type ImagenProps = {
    Item: Foto | null | undefined,
    children?: JSX.Element | JSX.Element[] | string
}

const Imagen = (props: ImagenProps) => {
    const { Item, children } = props;

    if (!Item) {
        return (
            <div className="mg-fluid img-thumbnail position-relative" style={{ paddingTop: '100%' }}>
                {
                    children
                        ? children
                        : <></>
                }
                <div className="position-absolute w-100 h-100 start-0 top-0 d-flex">
                    <MdOutlineNoPhotography className="position-absolute text-secondary h-75 w-auto"
                        style={{ top: '12.5%', left: '12.5%' }} />
                </div>
            </div>
        )
    }

    return (
        <div className="mg-fluid img-thumbnail position-relative" style={{ paddingTop: '100%' }}>
            {children}
            <div className="position-absolute w-100 h-100 start-0 top-0 d-flex">
                <img src={Item?.imagen as string} className="m-auto w-100 h-auto" />
            </div>
        </div>
    )
}
export default Imagen;
