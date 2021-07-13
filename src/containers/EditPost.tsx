import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styled from 'styled-components';
import APIURL from '../helpers/environment';

const Message = styled.div`
color: #32CD32;
font-size: 30px;
`

type PostData = {
    gamerTag: string,
    playersNeeded: number,
    micRequired: boolean,
    type: string,
    comments: string,
    postId: number,
    message2: boolean,

}

type AcceptedProps = {
    sessionToken: string | null,
    postId: number
}

export default class EditPost extends Component<AcceptedProps, PostData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            playersNeeded: 1,
            micRequired: true,
            type: 'casual',
            comments: '',
            postId: 0,
            message2: false,

        }
    }


    componentDidMount() {
        this.fetchPost()

    }
    fetchPost = () => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/posts/one/${this.props.postId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            }).then(
                (response) => response.json()
            ).then((data) => {
                console.log(data)
                this.setState({ gamerTag: data.gamerTag });
                this.setState({ playersNeeded: data.playersNeeded })
                this.setState({ micRequired: data.micRequired })
                this.setState({ type: data.type })
                this.setState({ comments: data.comments })
            })
        }
    }

    handleUpdate = (event: any) => {
        event.preventDefault();
        console.log(this.state);
        fetch(`${APIURL}/posts/update/${this.props.postId}`, {
            method: 'PUT',
            body: JSON.stringify({ gamerTag: this.state.gamerTag, playersNeeded: this.state.playersNeeded, micRequired: this.state.micRequired, type: this.state.type, comments: this.state.comments }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            this.setState({
                message2: true
            })
        })
    }


    handleGtInput(event: any) {
        this.setState({
            gamerTag: event.target.value
        })
    }

    handlePnInput(event: any) {
        console.log(typeof event.target.value);

        this.setState({
            playersNeeded: parseInt(event.target.value)
        })
    }
    handleMrInput(event: any) {
        this.setState({
            micRequired: event.target.value
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
        // console.log(this.props.postId);

        return (
            <>
                <div className='main'>
                    <div className='mainDiv'>
                        <Form>

                            <h2>Edit Post</h2>
                            <FormGroup>
                                <Label>Gamer Tag </Label>
                                <Input value={this.state.gamerTag} type="text" onChange={this.handleGtInput.bind(this)} />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label>Players Needed </Label>
                                <Input value={this.state.playersNeeded} placeholder='Players Needed' type="select" onChange={this.handlePnInput.bind(this)}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </Input>
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label>Mic Required? </Label>
                                <Input value={this.state.micRequired.toString()} placeholder='Mic Required?' type="select" onChange={this.handleMrInput.bind(this)}>
                                    <option value='true'>yes</option>
                                    <option value='false'>no</option>
                                </Input>
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label>Game Type </Label>
                                <Input value={this.state.type} placeholder='Game Type' type="select" onChange={this.handleTypeInput.bind(this)}>
                                    <option value='casual'>casual</option>
                                    <option value='ranked'>ranked</option>
                                </Input>
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <Label>Comments </Label>
                                <Input value={this.state.comments} placeholder='Comments' type="text" onChange={this.handleCommentsInput.bind(this)} />
                            </FormGroup>
                            <br />
                            <Button onClick={this.handleUpdate}>Update Post</Button>
                            {this.state.message2 === true && (
                                <Message>
                                    <p>Post successfully updated</p>
                                </Message>
                            )}
                            <br />

                        </Form>

                    </div>
                </div>
            </>
        )
    }
}