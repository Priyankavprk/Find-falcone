import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Result from './result';
import Home from './Home';
import './index.css';

ReactDOM.render(
  <Router>
    <Route path="/" exact component={Home}/>
    <Route path="/result" component={Result}/>
  </Router>
, document.getElementById('root'));
