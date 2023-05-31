import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({
  isLogged: LoginReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
