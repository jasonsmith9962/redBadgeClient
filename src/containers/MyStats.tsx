import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import APIURL from '../helpers/environment';
import styled from 'styled-components';

const Stats = styled.div`
background-color: white;
margin-top: 20px;
tr:nth-child(odd) {
    background-color: #f2f2f2;
}
font-size: 25px;
display: flex;
justify-content: center;
`

type ViewData = {
    gamerTag: string,
    gamesPlayed: number,
    gamesWon: number,
    kdRatio: number,
    myStats: any[],
    id: number,
}

type AcceptedProps = {
    sessionToken: string | null,
    updateStatsId: (newStatsId: number) => void
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
            id: 0,
        }
    }


    componentWillMount()  {
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
            this.setState({
                myStats: data,
            })

        })
    }

    handleDelete = (id: number) => {

        fetch(`${APIURL}/stats/delete/${id}`, {
            method: 'DELETE',
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
                {/* <button onClick={this.handleView}>View My Stats</button> */}


                {myStats.length > 0 && (
                    <div className='postsTable'>
                        {myStats.map(myStats => (
                            <div className='myStats' key={myStats.id}>
                                <Stats>
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
                                        <td scope='col'>{myStats.kdRatio}</td>
                                        <td><Link to={`/editstats`}><button type="submit" 
                                        onClick={(e) => {this.props.updateStatsId(myStats.id);}}>Update</button></Link></td>                                   
                                        <td><button onClick={() => this.handleDelete(myStats.id)}>Delete</button></td> 
                                        </tr>
                                    </tbody>
                                </Table>
                                </Stats>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}