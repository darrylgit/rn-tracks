import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'ADD_LOCATION':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    case 'RESET':
      return { ...state, name: '', locations: [] };
    case 'START_RECORDING':
      return { ...state, recording: true };
    case 'STOP_RECORDING':
      return { ...state, recording: false };
    case 'UPDATE_REGION_CENTER':
      return { ...state, regionCenter: action.payload };
    default:
      return state;
  }
};

const changeName = dispatch => name => {
  dispatch({ type: 'CHANGE_NAME', payload: name });
};
const startRecording = dispatch => () => {
  dispatch({ type: 'START_RECORDING' });
};
const stopRecording = dispatch => () => {
  dispatch({ type: 'STOP_RECORDING' });
};
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });

  if (recording) {
    dispatch({ type: 'ADD_LOCATION', payload: location });
  }
};
const updateRegionCenter = dispatch => coords => {
  dispatch({ type: 'UPDATE_REGION_CENTER', payload: coords });
};
const reset = dispatch => () => {
  dispatch({ type: 'RESET' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    updateRegionCenter,
    changeName,
    reset
  },
  {
    name: '',
    recording: false,
    locations: [],
    currentLocation: null,
    regionCenter: {
      latitude: 34.0721664,
      longitude: -84.1908224
    }
  }
);
