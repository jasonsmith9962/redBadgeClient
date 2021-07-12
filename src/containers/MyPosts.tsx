import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import APIURL from '../helpers/environment';


type ViewData = {
    gamerTag: string,
    playersNeeded: number,
    micRequired: boolean,
    type: string,
    comments: string,
    myPosts: any[],
    id: number,
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
            id: 0,
        }
    }


    componentWillMount() {

        fetch(`${APIURL}/posts/mine`, {
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

    handleDelete = (id: number) => {

        fetch(`${APIURL}/posts/delete/${id}`, {
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
                myPosts: data,
            })

        })
    }


    





    render() {
        const { myPosts } = this.state;
        return (
            <div className='main'>
                <div className='mainDiv'>
                </div>

                {myPosts.length > 0 && (
                    <div className='postsTable'>
                        {myPosts.map(myPosts => (
                            <div className='myPosts' key={myPosts.id}>
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
                                        <td><Link to={`/createpost/${myPosts.id}`}>Update</Link></td>
                                        <td><button onClick={() => this.handleDelete(myPosts.id)}>Delete</button></td>
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