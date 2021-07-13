import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Table } from 'reactstrap';
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
    stats: any[],
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class ViewStats extends Component<AcceptedProps, ViewData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            gamesPlayed: 0,
            gamesWon: 0,
            kdRatio: 0,
            stats: [],
        }
    }


    componentWillMount()  {

        fetch(`${APIURL}/stats/all`, {
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
                stats: data,
            })

        })
    }



    render() {
        const { stats } = this.state;
        return (
            <Stats>
                <br />
                {stats.length > 0 && (
                    <div className='statsTable'>
                        {stats.map(stats => (
                            <div className='posts'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Gamer Tag</th>
                                            <th>Games Played</th>
                                            <th>Games Won</th>
                                            <th>Kill/Death Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{stats.gamerTag}</td>
                                            <td>{stats.gamesPlayed}</td>
                                            <td>{stats.gamesWon}</td>
                                            <td>{stats.kdRatio}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        ))}
                    </div>
                )}
            </Stats>
        )
    }
}