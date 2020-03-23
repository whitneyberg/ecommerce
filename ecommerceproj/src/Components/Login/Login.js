import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }



    render(){
        return(
            <div className='login-wrap'>
                <div className='login-body'>
                    <div className='login'>
                        <h1>Login</h1>
                        <input placeholder='Email'/>
                        <input placeholder='Password' type='password'/>
                        <div className='login-buttons'>
                            <button className='login-btn'>LOGIN</button>
                            <Link to='/'><button className='cancel-btn'>CANCEL</button></Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Login;