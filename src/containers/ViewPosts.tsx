import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import APIURL from '../helpers/environment';

type ViewData = {
    gamerTag: string,
    playersNeeded: number,
    micRequired: boolean,
    type: string,
    comments: string,
    posts: any[],
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class ViewPosts extends Component<AcceptedProps, ViewData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            gamerTag: '',
            playersNeeded: 0,
            micRequired: true,
            type: '',
            comments: '',
            posts: [],
        }
    }


    handleView = (event: any) => {
        event.preventDefault();
        // console.log(this.state.type);

        fetch(`${APIURL}/posts/all`, {
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
                posts: data,
            })

        })
    }



    render() {
        const { posts } = this.state;
        return (
            <div className='main'>
                <div className='mainDiv'>
                    <button onClick={this.handleView}>View All Posts</button>
                </div>

                {posts.length > 0 && (
                    <div className='postsTable'>
                        {posts.map(posts => (
                            <div className='posts'>
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
                                        <td scope='col'>{posts.gamerTag}</td>
                                        <td scope='col'>{posts.playersNeeded}</td>
                                        <td scope='col'>{posts.micRequired? 'yes'  : 'no'}</td>
                                        <td scope='col'>{posts.type}</td>
                                        <td scope='col'>{posts.comments}</td>
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





