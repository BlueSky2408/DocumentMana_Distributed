import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;