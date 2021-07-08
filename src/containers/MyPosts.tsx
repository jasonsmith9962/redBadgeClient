import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

type ViewData = {
    gamerTag: string,
    playersNeeded: number,
    micRequired: boolean,
    type: string,
    comments: string,
    myPosts: any[],
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class MyPosts extends Component<AcceptedProps, ViewData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            playersNeeded: 0,
            micRequired: true,
            type: '',
            comments: '',
            myPosts: [],
        }
    }


    handleView = (event: any) => {
        event.preventDefault();
        // console.log(this.state.type);

        fetch('http://jas-team-apex.herokuapp.com/posts/mine', {
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
                myPosts: data,
            })

        })
    }



    render() {
        const { myPosts } = this.state;
        return (
            <div className='main'>
                <div className='mainDiv'>
                    <button onClick={this.handleView}>View My Posts</button>
                </div>

                {myPosts.length > 0 && (
                    <div className='postsTable'>
                        {myPosts.map(myPosts => (
                            <div className='myPosts'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Gamer Tag</th>
                                            <th scope='col'>Players Needed</th>
                                            <th scope='col'>Mic Required?</th>
                                            <th scope='col'>Game Type</th>
                                            <th scope='col'>Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td scope='col'>{myPosts.gamerTag}</td>
                                        <td scope='col'>{myPosts.playersNeeded}</td>
                                        <td scope='col'>{myPosts.micRequired? 'yes'  : 'no'}</td>
                                        <td scope='col'>{myPosts.type}</td>
                                        <td scope='col'>{myPosts.comments}</td>
                                        </tr>
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