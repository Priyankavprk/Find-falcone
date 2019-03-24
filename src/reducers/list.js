
const initialState = {
  destinationsSelected: {},
  data: {},
  usedVehicles: {},
  options: {},
  token: null,
  successPlanet: null,
  status: '',
}

export default function list(state = initialState, action) {
  switch (action.type) {
    case 'GET_PLANETS_SUCCESS' :
      return {
        ...state,
        options: {
          planets: action.planets
        }
      }

    case 'GET_VEHICLES_SUCCESS' :
      return {
        ...state,
        options: Object.assign({},state.options,
          {
            vehicles: action.vehicles
          }
        ),
      }

    case 'PLANET_SELECTED' :
      return {
        ...state,
        destinationsSelected: Object.assign({},state.destinationsSelected,
          {
            [action.key]: action.planet,
          }
        ),
      }

    case 'VEHICLE_SELECTED' :
      return {
        ...state,
        usedVehicles: Object.assign({},state.usedVehicles,
          {
            [action.key]: action.vehicle,
          }
        ),
      }

    case 'SET_TIME' :
      return {
        ...state,
        data: Object.assign({},state.data,
          {
            [action.key]: action.time,
          }
        ),
      }

    case 'RESET_STATE' :
      return {
        ...initialState,
      }

    case 'STORE_RESULT' :
      return {
        ...state,
        successPlanet: action.successPlanet,
        status: action.status,
      }

    default:
      return state;

  }
}
