import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './thanks.css';

class Thanks extends Component {
    render(){
        return(
            <div className='thanks-wrap'>
                <div className='thanks-body'>
                    <h1>Thank you for your order!</h1>
                    <h2>
                        You will receive a confirmation email for your order soon.
                        <br/>
                        We will contact you shortly for delivery info.
                    </h2>
                    <Link to='/'><button>CONTINUE SHOPPING</button></Link>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Thanks;