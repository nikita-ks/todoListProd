import {combineReducers, createStore} from "redux";
import {reducer} from "./reducer";

let rootReducer = combineReducers({
    todolists: reducer
});
export type AppState = ReturnType<typeof rootReducer>;
let store = createStore(rootReducer);
export default store;