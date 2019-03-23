import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import Result from './pages/result';
import Home from './pages/home';

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer)

ReactDOM.render(
 <Provider store={store}>
  <Router>
    <Route path="/" exact component={Home}/>
    <Route path="/result" component={Result}/>
  </Router>
 </Provider>
, document.getElementById('root'));
