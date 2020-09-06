import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'UPDATE_REGION_CENTER':
      return { ...state, regionCenter: action.payload };
    default:
      return state;
  }
};

const startRecording = dispatch => () => {};
const stopRecording = dispatch => () => {};
const addLocation = dispatch => location => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
};
const updateRegionCenter = dispatch => coords => {
  dispatch({ type: 'UPDATE_REGION_CENTER', payload: coords });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, updateRegionCenter },
  {
    recording: false,
    locations: [],
    currentLocation: null,
    regionCenter: {
      latitude: 34.0721664,
      longitude: -84.1908224
    }
  }
);
