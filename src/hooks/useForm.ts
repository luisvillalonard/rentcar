import { ChangeEvent, useState } from "react";
import { GetFileBase64, fileBase64 } from '../hooks/useUtils';
import { Foto } from "../interfaces/entidades/foto";

export function useForm<T>(initState: T) {

    const [entidad, setEntidad] = useState<T>(initState);

    const editar = (item: T) => {
        setEntidad(item)
    }

    const handleChangeInput = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { type, name, value, checked, files } = target;

        let elementValue: string | boolean | number | Foto | Foto[] | null = value;

        switch (type) {
            case 'checkbox':
            case 'switch':
                elementValue = checked;
                break;

            case 'radio':
                elementValue = value.toLowerCase() === 'true';
                break;

            case 'number':
                elementValue = parseFloat(value);
                break;

            case 'file':
                if (!files) {
                    elementValue = null;
                    break;
                }

                if (!target.multiple) {

                    const file = files.item(0);
                    if (file) {
                        const value = await GetFileBase64(files.item(0)) as string;
                        if (value) {
                            elementValue = {
                                id: 0,
                                imagen: value,
                                extension: file.type.split('/')[1],
                            } as Foto;
                        }
                    }

                } else {

                    await Promise.all(Array.from(files).map(async (file) => await fileBase64(file)))
                        .then((urls) => {
                            elementValue = urls.map(url => {
                                return {
                                    id: 0,
                                    imagen: url as string,
                                    extension: url as string
                                } as Foto;
                            })
                        });
                }
                break;

            default:
                break;
        }

        setEntidad({
            ...entidad,
            [name]: elementValue
        })
    }

    const handleChangeSelect = async ({ target }: ChangeEvent<HTMLSelectElement>) => {
        setEntidad({
            ...entidad,
            [target.name]: parseInt(target.value)
        })
    }

    return {
        entidad,
        editar,
        handleChangeInput,
        handleChangeSelect,
    }

}