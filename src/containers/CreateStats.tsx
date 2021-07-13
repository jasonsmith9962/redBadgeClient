import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styled from 'styled-components';
import APIURL from '../helpers/environment';

const Message = styled.div`
color: #39FF14;
`
type StatsData = {
    gamerTag: string,
    gamesPlayed: number,
    gamesWon: number,
    kdRatio: number,
    id?: number,
    message: boolean,
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class CreateStats extends Component<AcceptedProps, StatsData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            gamesPlayed: 0,
            gamesWon: 0,
            kdRatio: 0,
            message: false,
        }
    }

    componentDidMount() {
        const id = window.location.pathname.slice(-1)
        fetch(`${APIURL}/stats/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            if (typeof parseInt(id) === 'number') {
                this.setState(
                    data.filter((stats: StatsData) => stats.id === parseInt(id) ? 1 : 0)[0])
            }


        })
    }


    handleCreateStats = (event: any) => {
        event.preventDefault();

        fetch(`${APIURL}/stats/create`, {
            method: 'POST',
            body: JSON.stringify({ gamerTag: this.state.gamerTag, gamesPlayed: this.state.gamesPlayed, gamesWon: this.state.gamesWon, kdRatio: this.state.kdRatio }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data);
            this.setState({
                message: true
            })
        })
    }

    handleUpdate = (event: any) => {
        event.preventDefault();
        console.log(this.state);
        const id = window.location.pathname.slice(-1)
        fetch(`${APIURL}/stats/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ gamerTag: this.state.gamerTag, gamesPlayed: this.state.gamesPlayed, gamesWon: this.state.gamesWon, kdRatio: this.state.kdRatio }),
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

    handleGpInput(event: any) {
        this.setState({
            gamesPlayed: event.target.value
        })
    }
    handleGwInput(event: any) {
        this.setState({
            gamesWon: event.target.value
        })
    }
    handleKdInput(event: any) {
        this.setState({
            kdRatio: event.target.value
        })
    }



    render() {
        return (
            <>
            <div className='main'>
                <div className='mainDiv'>
                    <Form>

                        <h2>Create Stats</h2>
                        <FormGroup>
                            <Label>Gamer Tag </Label>
                            <Input value={this.state.gamerTag} placeholder='Gamer Tag' type="text" onChange={this.handleGtInput.bind(this)} />
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label>Games Played </Label>
                            <Input value={this.state.gamesPlayed} placeholder='Games Played' type="text" onChange={this.handleGpInput.bind(this)} />
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label>Games Won </Label>
                            <Input value={this.state.gamesWon} placeholder='Games Won' type="text" onChange={this.handleGwInput.bind(this)} />
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Label>Kill/Death Ratio </Label>
                            <Input value={this.state.kdRatio} placeholder='Kill/Death Ratio' type="text" onChange={this.handleKdInput.bind(this)} />
                        </FormGroup>
                        <br />
                        <Button onClick={this.handleCreateStats}>Submit Stats</Button>
                        <br />
                        <br />
                        <p>Use only when updating</p>
                        <Button onClick={this.handleUpdate}>Update My Stats</Button>
                    </Form>
                    
                    
                </div>
            </div>
{this.state.message === true && (
    <Message>
    <div className='message'>
        <p>Stats successfully created</p>
    </div>
    </Message>
)}
</>
        )
    }
}
