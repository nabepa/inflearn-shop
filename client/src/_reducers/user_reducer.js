import {
  SIGNIN_USER,
  REGISTER_USER,
  AUTH_USER,
  SIGNOUT_USER,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case SIGNIN_USER:
      return { ...state, signinSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case SIGNOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
