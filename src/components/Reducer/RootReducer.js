import { createStore, combineReducers, applyMiddleware } from "redux";
import BasketReducer from "./BasketReducer";
import HomeReducer from "./HomeReducer";
import ProductPageReducer from "./ProductPageReducer";
import FavoriteReducer from "./FavoriteReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  HomeReducer,
  ProductPageReducer,
  BasketReducer,
  FavoriteReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
