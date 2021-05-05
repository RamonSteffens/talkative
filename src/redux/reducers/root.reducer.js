import { combineReducers } from "redux";
import UserReducer from "./user.reducer";

const rootReducer = combineReducers({ UserReducer });

export default rootReducer;
