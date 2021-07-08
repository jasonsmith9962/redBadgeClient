import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

type PostData = {
    gamerTag: string,
    playersNeeded: number,
    micRequired: boolean, //how to get this to work?
    type: string,
    comments: string,
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class CreatePost extends Component<AcceptedProps, PostData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            playersNeeded: 1,
            micRequired: true,
            type: 'casual',
            comments: ''
        }
    }


    handleCreate = (event: any) => {
        event.preventDefault();
        console.log(this.state.type);

        fetch('http://jas-team-apex.herokuapp.com/posts/create', {
            method: 'POST',
            body: JSON.stringify({ gamerTag: this.state.gamerTag, playersNeeded: this.state.playersNeeded, micRequired: this.state.micRequired, type: this.state.type, comments: this.state.comments }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)

        })
    }


    handleGtInput(event: any) {
        this.setState({
            gamerTag: event.target.value
        })
    }

    handlePnInput(event: any) {
        this.setState({
            playersNeeded: event.target.value
        })
    }
    handleMrInput(event: any) {
        this.setState({
            playersNeeded: event.target.value
        })
    }
    handleTypeInput(event: any) {
        this.setState({
            type: event.target.value
        })
    }
    handleCommentsInput(event: any) {
        this.setState({
            comments: event.target.value
        })
    }

    




render() {
    return (
        <div className='main'>
            <div className='mainDiv'>
                <Form>

                    <h2>Create Post</h2>
                    <FormGroup>
                        <Label>Gamer Tag </Label>
                        <Input placeholder='Gamer Tag' type="text" onChange={this.handleGtInput.bind(this)} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label>Players Needed </Label>
                        <Input placeholder='Players Needed' type="select" onChange={this.handlePnInput.bind(this)}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                        </Input>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label>Mic Required? </Label>
                        <Input placeholder='Mic Required?' type="select" onChange={this.handleMrInput.bind(this)}>
                            <option value='true'>true</option>
                            <option value='false'>false</option>
                        </Input>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label>Game Type </Label>
                        <Input placeholder='Game Type' type="select" onChange={this.handleTypeInput.bind(this)}>
                            <option value='casual'>casual</option>
                            <option value='ranked'>ranked</option>
                        </Input>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label>Comments </Label>
                        <Input placeholder='Comments' type="text" onChange={this.handleCommentsInput.bind(this)} />
                    </FormGroup>
                    <br />
                    <Button onClick={this.handleCreate}>Submit Post</Button>

                </Form>
            </div>
        </div>

    )
}           
}

