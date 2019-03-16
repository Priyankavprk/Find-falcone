import React, { Component } from 'react';

import Footer from './components/footer';
import Header from './components/header';
import Dropdown from './components/dropDown';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      planets: null,
      destinationsSelected: [],
      timeTaken: 0,
      data: {},
      usedVehicles: {},
      options: {},
      token: null,
    }
    this.handlePlanetSelected = this.handlePlanetSelected.bind(this)
    this.findFalcone = this.findFalcone.bind(this)
    this.getToken = this.getToken.bind(this)
  }

  componentDidMount() {
    fetch(`https://findfalcone.herokuapp.com/planets`)
    .then((res) => {
      return res.json()
    }).then((data)=> {
      this.setState({
        options: {
          planets: [{name: 'Select'}, ...data]
        },
      })
    }).then(() => {
      fetch(`https://findfalcone.herokuapp.com/vehicles`)
      .then((res) => {
        return res.json()
      }).then((data) => {
        this.setState({
        options: Object.assign({},this.state.options,
          {
            vehicles: [...data]
          }
        ),
        })
      })
    })
  }

  handlePlanetSelected(event, value, time, key, vehicle) {
    if(event) {
      if(value !== "Select" && value) {
        this.state.destinationsSelected[this.state.destinationsSelected.indexOf(value)] = event
        // this.setState({
        //   destinationsSelected: [...(this.state.destinationsSelected.slice(1,this.state.destinationsSelected.indexOf(value))), event, ...(this.state.destinationsSelected.slice(this.state.destinationsSelected.indexOf(value) + 1, this.state.destinationsSelected.length))]
        // })
        this.setState({
          destinationsSelected: [...this.state.destinationsSelected]
        })
      } else {
        this.setState({
          destinationsSelected: [...this.state.destinationsSelected, event]
        })
      }
    } else {
      this.setState({
        data: Object.assign({},this.state.data,
          {
            [key]: time,
          }
        ),
        usedVehicles: Object.assign({},this.state.usedVehicles,
          {
            [key]: vehicle[0].name,
          }
        ),
      })
    }
  }

  getToken() {
    fetch('https://findfalcone.herokuapp.com/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      }
    }).then((res) => {
      this.findFalcone()
      if(!res.ok) {
        throw Error(res)
      }
      return res
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        token: data.token
      })
      this.findFalcone()
    })
    .catch(
      (error) => console.log('Failed to get token',error)
    )
  }

  findFalcone() {
    console.log('ooooooeooeoeoeoeo',{
      token: 'zWSOZUcQJOPUweUgYklARgNbuNVCyin',
      planet_names: this.state.destinationsSelected,
      vehicle_names: Object.values(this.state.usedVehicles)
    })
    fetch('https://findfalcone.herokuapp.com/find', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
      },
      body: JSON.stringify({
        token: 'zWSOZUcQJOPUweUgYklARgNbuNVCyin',
        planet_names: this.state.destinationsSelected,
        vehicle_names: Object.values(this.state.usedVehicles)
      })
    })
    .then((res) => {
      console.log('mmmmmmmmmmmmmmfind',res)
    })
  }

  render() {
    if (this.state.options.planets) {
      return (
        <div className="App">
          <Header />
          <header className="App-header">
          <div>Select planet you want to search in </div>
          <div className="body">
            <Dropdown value={1} options={this.state.options} handlePlanetSelected={this.handlePlanetSelected} destinationsSelected={this.state.destinationsSelected} usedVehicles={this.state.usedVehicles}/>
            <Dropdown value={2} options={this.state.options} handlePlanetSelected={this.handlePlanetSelected} destinationsSelected={this.state.destinationsSelected} usedVehicles={this.state.usedVehicles}/>
            <Dropdown value={3} options={this.state.options} handlePlanetSelected={this.handlePlanetSelected} destinationsSelected={this.state.destinationsSelected} usedVehicles={this.state.usedVehicles}/>
            <Dropdown value={4} options={this.state.options} handlePlanetSelected={this.handlePlanetSelected} destinationsSelected={this.state.destinationsSelected} usedVehicles={this.state.usedVehicles}/>
            <div className="timeText">Time taken : {Object.values(this.state.data).reduce(function(a, b) { return a + b; }, 0)}</div>
          </div>
          <div className="button">
            <input type="submit" onClick={this.getToken} value="Find Falcone !" disabled={(this.state.destinationsSelected.length === 4 && Object.values(this.state.usedVehicles).length === 4) ? false : true}/>
          </div>
          </header>
          <Footer />
        </div>
      );
    } else {
      return (
        <div> Loading ... </div>
      )
    }
  }
}

export default App;
