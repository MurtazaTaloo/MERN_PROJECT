// could try index.js
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  cart: cartReducer,
  form: formReducer
});
