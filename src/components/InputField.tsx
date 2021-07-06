import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

interface InputFieldProps {
    label: string;
    formFeedBack: string;
    formText: string;
    onChange: {};
    type: string;

}

const InputField: React.FC<InputFieldProps> = (props) => {
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input />
            <FormFeedback>{props.formFeedBack}</FormFeedback>
            <FormText>{props.formText}</FormText>
        </FormGroup>

    )
}

export default InputField;

