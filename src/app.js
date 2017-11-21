import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Auth from './lib/Auth';

class App extends React.Component {
  state = {
    users: []
  }
  componentDidMount(){
    Axios
      .get('api/users', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <h1>WDI Project 4: MERN Stack App</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
