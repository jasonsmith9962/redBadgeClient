import React, {Component} from 'react';
import './App.css';
import LoginForm from './containers/LoginForm'
import RegisterForm from './containers/RegisterForm';
import Auth from './containers/Auth';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Footer from './containers/Footer';
import Header from './containers/Header';


type Props = {}
type AppState = {
  sessionToken: string | null,
}

class App extends Component <Props, AppState> {
constructor(props: Props) {
  super(props);
  this.state = {
    sessionToken: ('')
  }
  this.updateToken = this.updateToken.bind(this);
}

componentDidMount() {
  if(localStorage.getItem('token')) {
    this.setState({
      sessionToken: localStorage.getItem('token')
    })
  }
}

clearToken(){
  localStorage.clear();
  this.setState({
    sessionToken: ''
  })
}

updateToken(newToken: string) {
  localStorage.setItem('token', newToken)
  this.setState({
    sessionToken: newToken
  }, () => console.log(this.state.sessionToken)
  )
}
render() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Sidebar updateToken={this.updateToken} sessionToken={this.state.sessionToken}/>
      </Router>
      <Footer />
    </div>
  );
}
}

export default App;
