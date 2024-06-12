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
                    height={40}
                    width={40}
                    color="#1b6ec2"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#7aa5cf"
                    strokeWidth={2}
                    strokeWidthSecondary={2}

                />
                <span className="d-flex">{Mensaje || 'Procesando...'}</span>
            </div>
        </div>
    )
}
export default Loading;
