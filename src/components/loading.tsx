import React from 'react';
import { Oval } from 'react-loader-spinner'

type LoadingProps = {
    Visible: boolean,
    Mensaje: string | null
}

const Loading = (props: LoadingProps) => {
    const { Visible, Mensaje } = props;

    if (!Visible) {
        return <></>
    }

    return (
        <div className="loading">
            <div className="loading-body">
                <Oval
                    height={55}
                    width={55}
                    color="#1b6ec2"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#7aa5cf"
                    strokeWidth={6}
                    strokeWidthSecondary={6}

                />
                <span className="d-flex fs-6 pt-3">{Mensaje || 'Procesando...'}</span>
            </div>
        </div>
    )
}
export default Loading;
