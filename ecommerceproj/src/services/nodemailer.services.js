import axios from 'axios';

const baseURL = '/api/mail';

function contact(body) {
    return axios
        .post(`${baseURL}/contact`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function orderMailer(body) {
    return axios
        .post(`${baseURL}/ordermailer`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    contact,
    orderMailer
}