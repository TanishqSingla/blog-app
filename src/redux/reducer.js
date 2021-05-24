import { combineReducers } from "redux";
import articles from "./reducers/article";
import authUser from "./reducers/aurthUser";
import common from "./reducers/common";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  articles,
  authUser,
  common,
  router: routerReducer,
});
