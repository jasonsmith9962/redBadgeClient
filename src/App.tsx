import React from 'react';
import './App.css';
import LoginForm from './containers/LoginForm'
import RegisterForm from './containers/RegisterForm';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
