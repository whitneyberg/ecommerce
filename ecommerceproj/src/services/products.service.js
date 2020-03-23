  
import axios from 'axios';

const baseURL = '/api/products';

function getProduct(productid) {
    return axios
        .get(`${baseURL}/${productid}`)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    getProduct
};