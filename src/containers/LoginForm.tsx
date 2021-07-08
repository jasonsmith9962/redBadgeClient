import React, { Component } from 'react';
import InputField from '../components/InputField';
import { Form, Button, Input } from 'reactstrap';

type LoginData = {
    emailAddress: string,
    password: string,
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

        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();


        fetch('http://jas-team-apex.herokuapp.com/user/login', {
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
                        <Input placeholder='Email' type="text" onChange={this.handleEmailInput.bind(this)} />
                        <Input placeholder='Password' type="text" onChange={this.handlePasswordInput.bind(this)} />
                        <Button onClick={this.handleSubmit.bind(this)}>Login</Button>
                    </Form>
                </div>
            </div>
        )
    }

}

