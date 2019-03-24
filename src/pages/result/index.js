import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import logo from '../../king.png';
import '../App.css';

export class Result extends Component {
  render() {
    if (this.props.data) {
      return (
        <div className="App">
          <Header />
          <header className="App-header">
            <div className="image">
              <img className="icon" src={logo} alt="king"/>
            </div>
            {
              this.props.status === "success" &&
              <div className="titlemain">
                <label> Success ! Congragulations on Finding Falcone. King Shan is mighty pleased.</label><br/>
                <label> Time taken: {Object.values(this.props.data).reduce(function(a, b) { return a + b; }, 0)} </label><br/>
                <label> Planet found: {this.props.successPlanet} </label><br/>
              </div>
            }
            {
              this.props.status === "false" &&
              <div className="titlemain">
                <label> Mission failed... Please try again... </label>
              </div>
            }
            <div className="button">
              <input type="submit" onClick={() => {this.props.history.push('/'); this.props.resetState()}} value="Start Again" />
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

const mapStateToProps = state => ({
  successPlanet: state.list.successPlanet,
  status: state.list.status,
  data: state.list.data
})

const mapDispatchToProps = dispatch => ({
  resetState: () => dispatch({type: 'RESET_STATE'})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)
