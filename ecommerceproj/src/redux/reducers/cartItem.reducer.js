import { CREATE_CART_ITEM } from '../actions/actionCreators';

let cartState = {};

function cartItem( state = cartState, action ){
    switch( action.type ) {
        case CREATE_CART_ITEM:
            return {
                ...state,
                cartState: [...state.cartState, action.payload]
            }

        default:
        return state;
    };
}

export default cartItem;