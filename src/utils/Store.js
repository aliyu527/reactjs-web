import Config from '../utils/Config';
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store           = Config.production ? createStore(reducers) : createStore( reducers, composeEnhancer(applyMiddleware(thunk)));
export default Store;
