// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "../reducers";
// import thunk from "redux-thunk";

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//     devTools: process.env.NODE_ENV !== "production",
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/auth';
import { dataReducer } from '../reducers/data';

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
