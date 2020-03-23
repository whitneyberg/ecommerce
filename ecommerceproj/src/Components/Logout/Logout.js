  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './logout.css';

class Logout extends Component {
    render(){
        return(
            <div className='logout-wrap'>
                <div className='logout-body'>
                    <h1>Logout Successful!</h1>
                    <h2>Thank you!</h2>
                    <Link to='/'><button>CONTINUE SHOPPING</button></Link>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Logout;