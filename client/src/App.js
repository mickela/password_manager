import React, { Component } from 'react';
import { Provider } from './context';
import { Switch } from 'react-router-dom';
import Routes from './routes';


class App extends Component {
  constructor(){
    super();
    this.state = {
      msg: ''
    }
  }
  render() {
    return (
      <Provider>
        <Switch>
          <Routes />
        </Switch>
      </Provider>
    )
  }
}

export default App