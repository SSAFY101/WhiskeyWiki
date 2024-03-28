import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "./slices/user";
import registerSlice from "./slices/register";
import exchangeSlice from "./slices/exchange";
import signupSlice from "./slices/signup";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["user", "register", "exchange", "signup"], // 스토리지에 저장할 리덕스 모듈을 나열
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  register: registerSlice.reducer,
  exchange: exchangeSlice.reducer,
  signup: signupSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
