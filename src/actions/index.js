
export function getData () {
  return (dispatch, getState) => {
    fetch(`https://findfalcone.herokuapp.com/planets`)
    .then((res) => {
      if(!res.ok) {
        throw Error(res)
      }
      return res.json()
    }).then((data)=> {
      dispatch(getPlanetsSuccess([{name: 'Select'}, ...data]))
    }).then(() => {
      fetch(`https://findfalcone.herokuapp.com/vehicles`)
      .then((res) => {
        if(!res.ok) {
          throw Error(res)
        }
        return res.json()
      }).then((data) => {
        dispatch(getVehiclesSuccess(data))
      })
    })
    .catch((error) => console.log('Request failed', error.message))
 }
}

export function handlePlanetSelected (key, data) {
  return {
    type: 'PLANET_SELECTED',
    planet: data,
    key,
  }
}

export function handleVehicleSelected (key, data) {
  return {
    type: 'VEHICLE_SELECTED',
    vehicle: data,
    key,
  }
}

export function setTime (key, data) {
  return {
    type: 'SET_TIME',
    time: data,
    key,
  }
}

export function getToken (route) {
  return (dispatch, getState) => {
    fetch('https://findfalcone.herokuapp.com/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
      }
    }).then((res) => {
      if(!res.ok) {
        throw Error(res)
      }
      return res
    })
    .then((res) => res.json())
    .then((data) => {
      dispatch(findFalcone(data.token, route))
    })
    .catch(
      (error) => console.log('Failed to get token', error.message)
    )
  }
}

function findFalcone(token, route) {
  return (dispatch, getState) => {
    fetch('https://findfalcone.herokuapp.com/find', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        planet_names: Object.values(getState().list.destinationsSelected),
        vehicle_names: Object.values(getState().list.usedVehicles)
      })
    })
    .then((res) => {
      if(!res.ok) {
        throw Error(res)
      }
      return res
    })
    .then((res) => res.json())
    .then((data) => {
      dispatch(storeResult(data))
    }).then(() => {
      route.push({pathname: '/result'})
    })
    .catch((error) => {
      console.log('Failed to fetch result', error.message)
    })
  }
}

function getPlanetsSuccess(data) {
  return {
    type: 'GET_PLANETS_SUCCESS',
    planets: data,
  }
}

function getVehiclesSuccess(data) {
  return {
    type: 'GET_VEHICLES_SUCCESS',
    vehicles: data,
  }
}

function storeResult(data) {
  return {
    type: 'STORE_RESULT',
    successPlanet: data.planet_name ? data.planet_name : null,
    status: data.status,
  }
}
