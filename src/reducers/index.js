import { combineReducers } from "redux";
import tokenReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";

export default combineReducers({
  form: formReducer,
  token: tokenReducer,
  homeReducer
});
