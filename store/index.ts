import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import todo from "./todo";

const rootReducer = combineReducers({
  todo,
})

const reducer = (state: any, action: any) => {
  if(action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

const bindMiddleware = (middleware: any) => {
  if(process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

export const wrapper = createWrapper(initStore);
