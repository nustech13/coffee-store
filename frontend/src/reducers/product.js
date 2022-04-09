const initialState = {
    listAll: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':{
            return{
                ...state,
                listAll: action.payload
            };
        }
    
        default:
            return state;
    }
}
export default productReducer;