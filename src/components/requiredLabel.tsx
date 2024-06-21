import { Form } from "react-bootstrap";

type RequiredLabelProps = {
    Text: string
}

const RequiredLabel = (props: RequiredLabelProps) => {
    const { Text } = props;

    return (
        <Form.Control.Feedback tooltip type="invalid" className="fw-bolder py-0">
            {Text || 'Requerido'}
        </Form.Control.Feedback>
    )
}
export default RequiredLabel;
