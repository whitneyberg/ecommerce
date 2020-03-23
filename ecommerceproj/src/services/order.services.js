import axios from 'axios';

const baseURL = '/api/orders';

function getAllOrders() {
    return axios
        .get(`${baseURL}/all`)
        .then( res => res )
        .catch( err => {throw err} );
}

function getOrders(email) {
    return axios
        .get(`${baseURL}/${email}`)
        .then( res => res )
        .catch( err => {throw err} );
}

function getOrder(id) {
    return axios
        .get(`${baseURL}/get/${id}`)
        .then( res => res )
        .catch( err => {throw err} );
}

function getOrderItems(orderid){
    return axios
        .get(`${baseURL}/items/${orderid}`)
        .then( res => res)
        .catch( err => {throw err})
}

function createOrder(body){
    return axios
        .post(`${baseURL}/neworder`, body)
        .then( res => res)
        .catch( err => {throw err})
}

function createOrderItem(body){
    return axios
        .post(`${baseURL}/newitem`, body)
        .then( res => res)
        .catch( err => {throw err})
}




export {
    getAllOrders,
    getOrders,
    getOrder,
    getOrderItems,
    createOrder,
    createOrderItem
};