import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import reducers here

const rootReducer = combineReducers({
  // Add reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
