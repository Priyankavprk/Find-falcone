import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handlePlanetSelected, handleVehicleSelected, setTime } from '../../actions';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './styles.css';

export class Dropdownmenu extends Component {
  constructor() {
    super();
    this.state = {
      valueSelected: "Select",
      selectedVehicle: null,
      planetSelected: null
    }
    this.handlePlanetSelected = this.handlePlanetSelected.bind(this)
    this.setVehicle = this.setVehicle.bind(this)
  }

  handlePlanetSelected(event) {
    this.props.handlePlanetSelected(this.props.value, event.target.value)
    let planet = this.props.options.planets.filter((planet) => planet.name === event.target.value)
    this.setState({
      valueSelected: event.target.value,
      planetSelected: planet
    })
    if(this.state.selectedVehicle) {
      this.findTimeTaken()
    }
  }

  showPlanets() {
    if (this.props.options && this.props.options.planets) {
    let listItems = this.props.options.planets.map((planet, j) => {
      if(planet.name !== this.state.valueSelected && !(Object.values(this.props.destinationsSelected).includes(planet.name))) {
        if (j === 0) {
          return <option key={j} defaultValue="Select" disabled hidden value={planet.name} className="planetList">{planet.name}</option>
        }
        return <option key={j} value={planet.name} className="planetList">{planet.name}</option>
      } else if(planet.name === this.state.valueSelected) {
        return <option key={j} defaultValue value={planet.name} className="planetList">{planet.name}</option>
      }
      return null
    })
    return listItems
   }
  }

  showVehicles() {
    if(this.props.options && this.props.options.vehicles) {
      let vehicleList = this.props.options.vehicles.map((vehicle, j) => {
        let count = []
        count = Object.values(this.props.usedVehicles).filter((v) => vehicle.name === v)
        //Show vehicles that can cover the distance of planet selected
        if(vehicle.max_distance >= this.state.planetSelected[0].distance) {
          if(vehicle.total_no - count.length === 0 && vehicle.name !== this.state.selectedVehicle) {
            return (
              <label className= "vehicleOptionsDisabled" key={j}>
               <input type="radio" value={vehicle.name} name={`vehicle+${this.props.value}`} disabled/>
               {vehicle.name} ({vehicle.total_no - count.length})<br/>
              </label>
            )
          } else {
            return (
              <label key={j}>
               <input type="radio" value={vehicle.name} name={`vehicle+${this.props.value}`}/>
               {vehicle.name} ({vehicle.total_no - count.length})<br/>
              </label>
            )
          }
        }
        return null
      })
      return vehicleList
    }
  }

  findTimeTaken() {
    let planet = this.props.options.planets.filter((data) => data.name === this.state.valueSelected)
    let vehicle = this.props.options.vehicles.filter((data) => data.name === this.state.selectedVehicle)
    this.props.setTime(this.props.value, planet[0].distance/vehicle[0].speed)
  }

  setVehicle(event) {
    this.props.handleVehicleSelected(this.props.value, event.target.value)
    this.setState({
      selectedVehicle: event.target.value
    }, () => {
        this.findTimeTaken()
    })
  }

  render() {
    return (
        <div className="container">
        <div className="menu">
        <div className="heading">Destination {this.props.value}</div>
        <select id="planet" className="planetSelect" value={this.state.valueSelected} onChange={this.handlePlanetSelected}>
        {
         this.showPlanets()
        }
        </select>
        </div>
        {
          this.state.valueSelected && this.state.planetSelected &&
          <div onChange={this.setVehicle.bind(this)} className="values">
            {
              this.showVehicles()
            }
          </div>
        }
        </div>
    );
  }
}

Dropdownmenu.propTypes = {
  destinationsSelected: PropTypes.object,
  options: PropTypes.object,
  usedVehicles: PropTypes.object
}

const mapStateToProps = state => ({
  destinationsSelected: state.list.destinationsSelected,
  options: state.list.options,
  usedVehicles: state.list.usedVehicles,
})

const mapDispatchToProps = dispatch => ({
  handlePlanetSelected: (key, data) => dispatch(handlePlanetSelected(key, data)),
  handleVehicleSelected: (key, data) => dispatch(handleVehicleSelected(key, data)),
  setTime: (key, data) => dispatch(setTime(key, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdownmenu)
