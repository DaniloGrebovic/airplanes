import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './redux';
import './App.css';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import { Routes } from './Routes'

const state = {};

const store = createStore(
  state,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => {
  return(
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
  )
};

export default App;
