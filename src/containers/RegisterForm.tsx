import React, {Component} from 'react';
import InputField from '../components/InputField';
import { Form, Button } from 'reactstrap';


type UserData = {
    emailAddress: string,
    password: string,
    role: string, //might be enum
}

export default class RegisterForm extends Component<{}, UserData>{
    constructor(props: UserData){
        super(props)
        this.state={
            emailAddress: '',
            password: '',
            role: 'user',
        }
    } 

    handleSubmit = (event:any) => {
        event.preventDefault();


        fetch('http://jas-team-apex.herokuapp.com/user/register', {
            method: 'POST',
            body: JSON.stringify({user:{ emailAddress: this.state.emailAddress, password: this.state.password, role: this.state.role}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            // this.props.updateToken(data.sessionToken)
        })
        
    }

    handleEmailInput(event:any) {
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
        <Form>
            <h2>Register</h2>
            {/* <InputField label="First Name"/> */}
            <InputField type='text' label='Email' formFeedBack='' formText='' onChange={this.handleEmailInput.bind(this)}  />
            <InputField type='text' label='Password' formFeedBack='' formText='' onChange={this.handlePasswordInput.bind(this)} />
            <Button onClick={this.handleSubmit}>Sign Up</Button>
            
            
        </Form>

    )
}

}

