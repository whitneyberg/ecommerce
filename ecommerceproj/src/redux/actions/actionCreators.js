export const UPDATE_AUTH = "UPDATE_AUTH";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const ADD_TO_CART = "ADD_TO_CART";
export const CREATE_CART_ITEM = "CREATE_CART_ITEM";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const EMPTY_CART = "EMPTY_CART";
export const DELETE_ITEM = "DELETE_ITEM";

export function updateAuth(boolean){
    return {
        type: UPDATE_AUTH,
        payload: boolean
    }
}

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateCustomer(customer){
    return {
        type: UPDATE_CUSTOMER,
        payload: customer
    }
}

export function updateOrder(order){
    return {
        type: UPDATE_ORDER,
        payload: order
    }
}

export function addToCart(product){
    return {
        type: ADD_TO_CART,
        payload: product
    }
}
export function removeCartItem(item){
    return {
        type: REMOVE_CART_ITEM,
        payload: item
    }
}

export function emptyCart(){
    return {
        type: EMPTY_CART,
    }
}

export function deleteItem() {
    return {
        type: DELETE_ITEM
    }
}


export function getCartItem(item){
    return {
        type: CREATE_CART_ITEM,
        payload: item
    }

}

