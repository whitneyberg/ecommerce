import axios from 'axios';

const baseURL = '/api/users';

function register(body) {
    return axios
        .post(`${baseURL}/register`, body)
        .then( res => res)
        .catch( err => {throw err});
}

export {
    register
};