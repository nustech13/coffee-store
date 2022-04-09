import { combineReducers } from 'redux';

import productReducer from './product';
import userReducer from './user';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
});

export default rootReducer;