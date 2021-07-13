import React, { Component } from 'react';
import { Form, Button, Input } from 'reactstrap';
import APIURL from '../helpers/environment';

type LoginData = {
    emailAddress: string,
    password: string,
    role: string,
    
}

type AcceptedProps = {
    updateToken: (newToken: string) => void
}

export default class LoginForm extends Component<AcceptedProps, LoginData>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            emailAddress: '',
            password: '',
            role: '',
            

        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();


        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ user: { emailAddress: this.state.emailAddress, password: this.state.password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
            console.log(data)
            localStorage.setItem('role', data.user.role)

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
                        <h2>Login</h2>
                        <Input required type='email' placeholder='Email' onChange={this.handleEmailInput.bind(this)} />
                        <Input required MinLength='5' placeholder='Password' type="password" onChange={this.handlePasswordInput.bind(this)} />
                        <Button onClick={this.handleSubmit.bind(this)}>Login</Button>
                    </Form>
                </div>
            </div>
        )
    }

}

