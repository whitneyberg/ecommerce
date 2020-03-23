import { ADD_TO_CART, EMPTY_CART, DELETE_ITEM} from '../actions/actionCreators';

export function cartReducer( state = {
        cart: []
    }, action ){
    switch( action.type ) {
        case ADD_TO_CART:{
            return {
                cart: [...state.cart, action.payload]
            }
        }
        case EMPTY_CART: {
            return {
                cart: []
            }
        }
        case DELETE_ITEM: {
            return {
                cart: [state.cart.filter(item => action.payload !== item)]
            }
        }

    default:
    return state;
    }
}