import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const composeEnhacer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(rootReducer, composeEnhacer(applyMiddleware(thunk)));

export default store;