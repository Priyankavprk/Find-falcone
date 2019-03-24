import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getData, getToken } from '../../actions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Dropdown from '../../components/DropDown';
import logo from '../../king.png';
import '../App.css';

export class Home extends Component {
  componentDidMount() {
    this.props.getData()
  }

  render() {
    if (this.props.options && this.props.options.planets) {
      return (
        <div className="App">
          <Header />
            <header className="App-header">
              <div className="image">
                <img className="icon" src={logo} alt="king"/>
              </div>
              <div className="titlemain">Select planet you want to search in </div>
              <div className="body">
                <Dropdown value={1}/>
                <Dropdown value={2}/>
                <Dropdown value={3}/>
                <Dropdown value={4}/>
                <div className="timeText">Time taken : {Object.values(this.props.data).reduce(function(a, b) { return a + b; }, 0)}</div>
              </div>
             <div>
                <input type="submit" onClick={() => this.props.getToken(this.props.history)} value="Find Falcone !" disabled={(Object.values(this.props.destinationsSelected).length === 4 && Object.values(this.props.usedVehicles).length === 4) ? false : true}/>
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

Home.propTypes = {
  options: PropTypes.object,
  destinationsSelected: PropTypes.object,
  usedVehicles: PropTypes.object,
  data: PropTypes.object
}

const mapStateToProps = state => ({
  options: state.list.options,
  destinationsSelected: state.list.destinationsSelected,
  usedVehicles: state.list.usedVehicles,
  data: state.list.data,
})

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  getToken: (route) => dispatch(getToken(route))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
