// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import { apiSlice } from "./api/apiSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["api"],
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(apiSlice.middleware),
//   devTools: import.meta.env.MODE === "development",
// });

// export const persistor = persistStore(store);

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // API Slice
// import { apiSlice } from "./api/apiSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Required for redux-persist
//     }).concat(apiSlice.middleware),
//   devTools: import.meta.env.MODE === "development",
// });

// // Create persistor
// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { useDispatch, useSelector } from 'react-redux';

// API Slice
import { apiSlice } from "./api/apiSlice";

// Reducers
import authReducer from "./api/feature/authSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === "development",
});

// Create persistor
export const persistor = persistStore(store);
