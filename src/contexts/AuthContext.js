import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signUp = dispatch => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signup', { email, password });
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
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
  { isSignedIn: false }
);
