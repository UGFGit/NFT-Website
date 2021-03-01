import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles/index.css';
import Root from './containers/Root';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { SocketProvider } from './socket';

const store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, /*logger*/)
);

ReactDOM.render(
  <React.StrictMode>
     <SocketProvider>
      <Provider store={store}>
          <Root/>
      </Provider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
