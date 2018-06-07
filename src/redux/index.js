import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from '../utils/promiseMiddleware';
import home from './home';

const sagaMiddleware = createSagaMiddleware();
const middleware = [promiseMiddleware, sagaMiddleware];

const createStoreWithMiddleware = compose(
  applyMiddleware(
    ...middleware,
  ),
)(createStore);

const create = (...args) => {
  const store = createStoreWithMiddleware(
    combineReducers({
      home
    }),
    ...args,
  );
  return store;
};

export default create;