import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { version } from "react";
import {persistReducer,persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

const rootReducer = combineReducers({
    user:userReducer,

})

const persistConfig = {
    key:"root",
    storage,
    version: 1,

}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddelware) =>
        getDefaultMiddelware({
            serializableCheck:false,    
        }),
    
})
export const persistor = persistStore(store);