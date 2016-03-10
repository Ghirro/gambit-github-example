import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './reducers/user';
import { createMiddleware, gambitReducer } from 'gambit';
import api from './Api.js';
import HomeContainer from './HomeContainer';

const gambitMiddleware = createMiddleware(api);
const store = createStore(
  combineReducers({ user: userReducer, gambit: gambitReducer }),
  {},
  compose(
    applyMiddleware(gambitMiddleware),
  ),
);

function App() {
  return (
    <Provider store={store}>
      <HomeContainer />
    </Provider>
  );
}

render(<App />, document.getElementById('gambit-example'));
