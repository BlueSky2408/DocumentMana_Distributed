import { combineReducers } from 'redux';
import loginReducer from './login';
import documentsReducer from './documents'
// import userReducer from './users';
const reducer = combineReducers({
    login: loginReducer,
    documents: documentsReducer,
    // users: userReducer,
});
const rootReducer = (state, action) => {
    let stateTemp = state;
    if (action.type === "RESET_INITIAL") {
        stateTemp = undefined;
    }
    return reducer(stateTemp, action);
};

export default rootReducer;
