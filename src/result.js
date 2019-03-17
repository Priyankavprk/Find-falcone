import React, { Component } from 'react';

import Footer from './components/footer';
import Header from './components/header';
import logo from './king.png';
import './App.css';

class Result extends Component {
  render() {
    if (this.props.location && this.props.location.state.data) {
      return (
        <div className="App">
          <Header />
          <header className="App-header">
            <div className="image">
              <img className="icon" src={logo} alt="king"/>
            </div>
            {
              this.props.location.state.data.status === "success" &&
              <div className="titlemain">
                <label> Success ! Congragulation on Finding Falcone. King Shan is mighty pleased.</label><br/>
                <label> Time taken: {Object.values(this.props.location.state.time).reduce(function(a, b) { return a + b; }, 0)} </label><br/>
                <label> Planet found: {this.props.location.state.data.planet_name} </label><br/>
              </div>
            }
            {
              this.props.location.state.data.status === "false" &&
              <div className="titlemain">
                <label> Mission failed... Please try again... </label>
              </div>
            }
            <div className="button">
              <input type="submit" onClick={() => {this.props.history.push('/')}} value="Start Again" />
            </div>
          </header>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="loading"> Loading ... </div>
      )
    }
  }
}

export default Result;
