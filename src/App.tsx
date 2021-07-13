import React, {Component} from 'react';
import './App.css';
import LoginForm from './containers/LoginForm'
import RegisterForm from './containers/RegisterForm';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Footer from './containers/Footer';
import Header from './containers/Header';


type Props = {}
type AppState = {
  sessionToken: string | null,
  postId: number,
  statsId: number,
}

class App extends Component <Props, AppState> {
constructor(props: AppState) {
  super(props);
  this.state = {
    sessionToken: (''),
    postId: 0,
    statsId: 0,

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

clearToken = () => {
  localStorage.clear();
  window.location.reload()
}

updateToken = (newToken: string) => {
  localStorage.setItem('token', newToken)
  this.setState({
    sessionToken: newToken
  }, () => console.log(this.state.sessionToken)
  )
};

updatePostId = (newPostId: number) => {
  this.setState({postId: newPostId});

};

updateStatsId = (newStatsId: number) => {
  this.setState({statsId: newStatsId})
}


render() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Sidebar statsId={this.state.statsId} updateStatsId={this.updateStatsId} postId={this.state.postId} updatePostId={this.updatePostId} updateToken={this.updateToken} sessionToken={this.state.sessionToken} clearToken={this.clearToken}/>
      </Router>
      <Footer />
    </div>
  );
}
}

export default App;
