import React from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import RegisterForm from '../containers/RegisterForm';
import CreatePost from '../containers/CreatePost';



type AcceptedProps = {
    updateToken: (newToken: string) => void
}


const Sidebar: React.FunctionComponent<AcceptedProps> = (props) => {

    return(
        <>
        <div className='sidebar'>
            <div className='sidebar-list-styling'>
                <ul className='sidebar-list list-unstyled'>
                    <li><Link to='/loginform'>Login</Link></li>
                    <li><Link to='/registerform'>Register</Link></li>
                    <li><Link to='/createpost'>Create Post</Link></li>
                </ul>
            </div>
        
        <div className='sidebar-route'>
            <Switch>
            <Route exact path='/loginform'><LoginForm updateToken={props.updateToken}/></Route>
            <Route exact path='/registerform'><RegisterForm updateToken={props.updateToken}/></Route>
            <Route exact path='/createpost'><CreatePost /></Route>
            </Switch>
        </div>
        </div>
    </>
    )

}

export default Sidebar;