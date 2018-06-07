import { combineReducers } from 'redux';

export const FETCH_AIRPLANES = 'airplane/FETCH_AIRPLANES';
export const FETCH_AIRPLANES_SUCCESS = 'airplane/FETCH_AIRPLANES_SUCCESS';
export const FETCH_AIRPLANES_FAILURE = 'airplane/FETCH_AIRPLANES_FAILURE';

export default combineReducers({
  airplanesData,
  airplanesLoading,
});


export function airplanesData(state = {}, action) {
  switch (action.type) {
    case FETCH_AIRPLANES_SUCCESS:
      return {
        ...state,
        ...action.result,
      };
    case FETCH_AIRPLANES_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function airplanesLoading(state = true, action) {
  switch (action.type) {
    case FETCH_AIRPLANES:
      return true;
    case FETCH_AIRPLANES_SUCCESS:
    case FETCH_AIRPLANES_FAILURE:
      return false;
    default:
      return state;
  }
}

export const getAirplanesData = (latitude, longitude) => ({
  types: [FETCH_AIRPLANES, FETCH_AIRPLANES_SUCCESS, FETCH_AIRPLANES_FAILURE],
  promise: () => fetch(`https://adsbexchange-proxy.herokuapp.com/adsbexchange/?lat=${latitude}&lng=${longitude}&fDstL=0&fDstU=100`, {
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'alexa-aircraft-radar',
      'Accept-Encoding': 'identity'
    },
    method: "GET",
  }).then(res => res.json())
});

