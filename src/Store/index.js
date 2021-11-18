import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import UsersReducer from "../Reducers/UsersReducer";
import QuestionsReducers from "../Reducers/QuestionsReducers";

const Reducers = combineReducers({
  Users: UsersReducer,
  Questions: QuestionsReducers,
});

const Middleware = applyMiddleware(thunk);
const store = createStore(Reducers, composeWithDevTools(Middleware));

export default store;
