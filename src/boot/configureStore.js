// @flow
import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "../reducers";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer);


export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: "flatapp",
      realtime: true
    })
  );

  const store = createStore(persistedReducer, enhancer);

  persistStore(store);


  return store;
}
