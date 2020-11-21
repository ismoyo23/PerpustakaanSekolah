import { createStore, applyMiddleware } from "redux";
// =========================================================

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// =========================================================

import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducers";

// =========================================================
let persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

let persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(
  persistedReducer, // root reducer => persited reducers
  applyMiddleware(promiseMiddleware)
);

let persistor = persistStore(store);
// ========================================================
export default { store, persistor };
