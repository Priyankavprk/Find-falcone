import React, { Component } from 'react';

import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';

class Dropdownmenu extends Component {
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
    let planet = this.props.options.planets.filter((planet) => planet.name === event.target.value)
    if(typeof this.props.handleDataSelected === 'function') {
      this.props.handleDataSelected(event.target.value, this.props.value)
      this.setState({
        valueSelected: event.target.value,
        planetSelected: planet
      })
    }
    if(this.state.selectedVehicle) {
      this.findTimeTaken()
    }
  }

  showPlanets() {
    if (this.props.options && this.props.options.planets) {
    let listItems = this.props.options.planets.map((planet, j) => {
      if(planet.name !== this.state.valueSelected && !(Object.values(this.props.destinationsSelected).includes(planet.name))) {
        if(j === 0) {
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
    this.props.handleDataSelected(null, this.props.value, planet[0].distance/vehicle[0].speed, vehicle)
  }

  setVehicle(event) {
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

export default Dropdownmenu;
