import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'SIGN_UP':
    case 'SIGN_IN':
      return { errorMessage: '', token: action.payload };
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state };
    case 'SIGN_OUT':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({
      type: 'SIGN_IN',
      payload: token
    });
    navigate('TrackList');
  } else {
    navigate('LoginFlow');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE' });
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

const signIn = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'SIGN_IN', payload: response.data.token });

    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'ADD_ERROR',
      payload: 'Something went wrong with sign in'
    });
  }
};

const signOut = dispatch => async () => {
  await AsyncStorage.removeItem('token');

  dispatch({ type: 'SIGN_OUT' });

  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signUp, signOut, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: '' }
);
