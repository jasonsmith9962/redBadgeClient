import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

type ViewData = {
    gamerTag: string,
    gamesPlayed: number,
    gamesWon: number,
    kdRatio: number,
    myStats: any[],
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class MyStats extends Component<AcceptedProps, ViewData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            gamesPlayed: 0,
            gamesWon: 0,
            kdRatio: 0,
            myStats: [],
        }
    }


    handleView = (event: any) => {
        event.preventDefault();
        // console.log(this.state.type);

        fetch('http://jas-team-apex.herokuapp.com/stats/mine', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            this.setState({
                myStats: data,
            })

        })
    }



    render() {
        const { myStats } = this.state;
        return (
            <div className='main'>
                <div className='mainDiv'>
                    <button onClick={this.handleView}>View My Stats</button>
                </div>

                {myStats.length > 0 && (
                    <div className='postsTable'>
                        {myStats.map(myStats => (
                            <div className='posts'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Gamer Tag</th>
                                            <th scope='col'>Games Played</th>
                                            <th scope='col'>Games Won</th>
                                            <th scope='col'>Kill/Death Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td scope='col'>{myStats.gamerTag}</td>
                                        <td scope='col'>{myStats.gamesPlayed}</td>
                                        <td scope='col'>{myStats.gamesWon}</td>
                                        <td scope='col'>{myStats.kdRatio}</td>                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}