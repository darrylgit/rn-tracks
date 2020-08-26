import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'SIGN_UP':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const signUp = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'SIGN_UP', payload: response.data.token });

    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'ADD_ERROR',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signIn = dispatch => {
  // make api request to sign in with that email and password
  // if we sign up, modify our state, and say that we are authenticated
  // if signing in fails, reflect an error message
};

const signOut = dispatch => {
  return () => {
    // sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signUp, signOut },
  { token: null, errorMessage: '' }
);
