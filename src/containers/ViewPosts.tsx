import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import APIURL from '../helpers/environment';
import styled from 'styled-components';

const Posts = styled.div`
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


    componentWillMount()  {

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
            <Posts>
                <br />
                {posts.length > 0 && (
                    <div className='postsTable'>
                        {posts.map(posts => (
                            <div className='posts'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Gamer Tag</th>
                                            <th>Players Needed</th>
                                            <th>Mic Required?</th>
                                            <th>Game Type</th>
                                            <th>Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{posts.gamerTag}</td>
                                            <td>{posts.playersNeeded}</td>
                                            <td>{posts.micRequired ? 'yes' : 'no'}</td>
                                            <td>{posts.type}</td>
                                            <td>{posts.comments}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        ))}
                    </div>
                )}
            </Posts>
        )
    }
}





