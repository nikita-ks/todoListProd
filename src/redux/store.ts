import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer} from "./reducer";
import {ActionsTypes} from "../types/ActionTypes";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

let rootReducer = combineReducers({
    todolists: reducer
});
export type AppState = ReturnType<typeof rootReducer>;
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, ActionsTypes>)));
export default store;