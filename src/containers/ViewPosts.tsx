import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

type ViewData = {
    gamerTag: string,
    playersNeeded: number,
    micRequired: boolean,
    type: string,
    comments: string,
}

type AcceptedProps = {
    sessionToken: string | null,
}

export default class ViewPosts extends Component<AcceptedProps, ViewData> {
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


    handleView = (event: any) => {
        event.preventDefault();
// console.log(this.state.type);

        fetch('http://jas-team-apex.herokuapp.com/posts/all', {
            method: 'GET',
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



render() {
    return(
            <div className ='main'>
            <div className='mainDiv'>
                <button onClick={this.handleView}>View All Posts</button>
            </div>
            </div>

        )
    }           
}





