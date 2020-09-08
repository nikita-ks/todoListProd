import { applyMiddleware, combineReducers, createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { reducer } from "./reducer";
import { ActionsTypes } from "../types/ActionTypes";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

let rootReducer = combineReducers({
    todolists: reducer
});
export type AppState = ReturnType<typeof rootReducer>;
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
// let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, ActionsTypes>)));
export default store;
//@ts-ignore
window.store = store