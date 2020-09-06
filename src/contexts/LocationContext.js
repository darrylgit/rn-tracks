import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'UPDATE_CENTER':
      console.log(action.payload);
      return { ...state, center: action.payload };
    default:
      return state;
  }
};

const startRecording = dispatch => () => {};
const stopRecording = dispatch => () => {};
const addLocation = dispatch => location => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
};
const updateCenter = dispatch => coords => {
  dispatch({ type: 'UPDATE_CENTER', payload: coords });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, updateCenter },
  {
    recording: false,
    locations: [],
    currentLocation: null,
    center: {
      latitude: 34.0721664,
      longitude: -84.1908224
    }
  }
);
