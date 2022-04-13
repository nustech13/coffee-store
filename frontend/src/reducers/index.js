import { combineReducers } from 'redux';
import cartReducer from './cart';
import productReducer from './product';
import userReducer from './user';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
});

export default rootReducer;