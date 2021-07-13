import React, { Component } from 'react';
import InputField from '../components/InputField';
import { Form, Button, Input } from 'reactstrap';
import APIURL from '../helpers/environment';


type RegisterData = {
    emailAddress: string,
    password: string,
}
type AcceptedProps = {
    updateToken: (newToken: string) => void
}

export default class RegisterForm extends Component<AcceptedProps, RegisterData>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            emailAddress: '',
            password: '',
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();


        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({ user: { emailAddress: this.state.emailAddress, password: this.state.password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
        })

    }

    handleEmailInput(event: any) {
        this.setState({
            emailAddress: event.target.value
        })
    }

    handlePasswordInput(event: any) {
        this.setState({
            password: event.target.value
        })
    }


    render() {
        return (
            <div className='main'>
                <div className='mainDiv'>
                    <Form>
                        <h2>Register</h2>
                        <Input required type='email' placeholder='Email' onChange={this.handleEmailInput.bind(this)} />
                        <Input required MinLength='5' placeholder='Password' type="text" onChange={this.handlePasswordInput.bind(this)} />
                        <Button onClick={this.handleSubmit}>Sign Up</Button>
                    </Form>
                </div>
            </div>

        )
    }

}

