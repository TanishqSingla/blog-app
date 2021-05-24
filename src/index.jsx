import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Switch, Route} from 'react-router-dom'; 
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import {store, history} from './redux/store'
import { getUser } from './redux/actions/actions';

if(localStorage.Auth) {
  store.dispatch({type: 'SET_USER', user: JSON.parse(localStorage.Auth)})

  var _id = JSON.parse(localStorage.Auth)._id
  getUser(_id).then({type: 'SET_USER', user: res})
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
