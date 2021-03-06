import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/home'
import Details  from './components/Details'
import Error  from './components/error'

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/details/:id?"  component={Details}/>
        <Route path="/error/:error?"  component={Error}/>
      </Switch>
    );
  }
}