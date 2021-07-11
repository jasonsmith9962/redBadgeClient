import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {Form, Input, Label, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

type AdminData = {
    id: number,
    postId: number
    
}


type AcceptedProps = {
    sessionToken: string | null,
}

export default class AdminDelete extends Component<AcceptedProps, AdminData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            id: 0,
            postId: 0
            
        }
        
    }
    
    handleDelete = (id: number) => {

        fetch(`${APIURL}/user/delete/admin/${id}`, {
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
                id: data,
            })

        })
    }

    handleDeletePost = (postId: number) => {

        fetch(`${APIURL}/posts/delete/admin/${postId}`, {
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
                postId: data,
            })

        })
    }

    render() {
        return(
            <div className='main'>
                <div className='mainDiv'>
                    <Form>
                        <Label>User's ID</Label>
                        <Input onChange={(e) => this.setState({id: parseInt(e.target.value)})} />
                        <br/>
                        <Button onClick={(e) => this.handleDelete(this.state.id)}>Delete User and All Data</Button>
                        <br />
                        <br />
                        <Label>Post ID</Label>
                        <Input onChange={(e) => this.setState({postId: parseInt(e.target.value)})}/>
                        <br />
                        <Button onClick={(e) => this.handleDeletePost(this.state.postId)}>Delete A Post</Button>

                    </Form>
                </div>
            </div>
        )
    }


    

}
