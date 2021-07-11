import React from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import RegisterForm from '../containers/RegisterForm';
import CreatePost from '../containers/CreatePost';
import CreateStats from '../containers/CreateStats';
import ViewPosts from '../containers/ViewPosts';
import MyPosts from '../containers/MyPosts';
import MyStats from '../containers/MyStats';
import Logout from '../containers/Logout';
import AdminDelete from '../containers/AdminDelete';



type AcceptedProps = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    clearToken: () => void
}


const Sidebar: React.FunctionComponent<AcceptedProps> = (props) => {
    if (props.sessionToken === localStorage.getItem('token')) {
        console.log(props.sessionToken)

        return (
            <>
                <div className='sidebar'>
                    <div className='sidebar-list-styling'>
                        <ul className='sidebar-list list-unstyled'>
                            <li><Link to='/createstats'>Create Stats</Link></li>
                            <li><Link to='/createpost'>Create Post</Link></li>
                            <li><Link to='/viewposts'>View Posts</Link></li>
                            <li><Link to='/myposts'>View My Posts</Link></li>
                            <li><Link to='/mystats'>View My Stats</Link></li>
                            <li><Link to='/admindelete'>Admin</Link></li>
                            <br />
                            <button onClick={props.clearToken}>Logout</button>
                        </ul>
                    </div>

                    <div className='sidebar-route'>
                        <Switch>
                            <Route path='/createstats'><CreateStats sessionToken={props.sessionToken} /></Route>
                            <Route path='/createpost'><CreatePost sessionToken={props.sessionToken} /></Route>
                            <Route exact path='/viewposts'><ViewPosts sessionToken={props.sessionToken} /></Route>
                            <Route exact path='/myposts'><MyPosts sessionToken={props.sessionToken} /></Route>
                            <Route exact path='/mystats'><MyStats sessionToken={props.sessionToken} /></Route>
                            <Route exact path='/admindelete'><AdminDelete sessionToken={props.sessionToken} /></Route>
                        </Switch>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='sidebar'>
                    <div className='sidebar-list-styling'>
                        <ul className='sidebar-list list-unstyled'>
                            <li><Link to='/loginform'>Login</Link></li>
                            <li><Link to='/registerform'>Register</Link></li>

                        </ul>
                    </div>

                    <div className='sidebar-route'>
                        <Switch>
                            <Route exact path='/loginform'><LoginForm updateToken={props.updateToken} /></Route>
                            <Route exact path='/registerform'><RegisterForm updateToken={props.updateToken} /></Route>

                        </Switch>
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar;

//use localStorage for some work arounds.