import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import popupSlice from "./slices/popupSlice";

const persistConfig = {
  key: "blog_data",
  storage,
};

const reducers = combineReducers({
  user: userSlice,
});

const persistSliceReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    persistSliceReducer,
    popup: popupSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
persistStore(store);
export default store;
