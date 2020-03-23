import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/register.services';
import Footer from '../Footer/Footer';
import './register.css';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            company: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            phone: '',
            email: '',
            rightEmail: false,
            checkEmail: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonRegister = this.handleButtonRegister.bind(this);
        this.GmailCheck = this.GmailCheck.bind(this);
        this.handleCheckEmail = this.handleCheckEmail.bind(this);
    }

    handleInputChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState });
    }

    GmailCheck(e) {
        let email = e.target.value;
        this.setState({email: email});
        if(email.length > 0){
            email.includes('@gmail.com') ? this.setState({rightEmail: true}) : this.setState({rightEmail: false});
        }
    }

    handleCheckEmail(e){
        let email = e.target.value;
        if(email.length > 0){
            email === this.state.email ? this.setState({checkEmail: true}) : this.setState({checkEmail: false});
        }
        console.log(this.state);
    }

    handleButtonRegister() {
        console.log('register button fired!')
        console.log(this.state);
        const { first_name, last_name, company, address, city, state, zip_code, phone, email } = this.state;
        const reqBody = { first_name, last_name, company, address, city, state, zip_code, phone, email };
        register(reqBody)
            .then( res => res.data )
            .catch( err => {throw err})
    }

    render(){
        return(
            <div className='register-wrap'>
                <div className='register-body'>
                    <h1>Register</h1>
                    <div className='regi-inputs'>
                        <input className='firstName' placeholder='First Name' type="text" name="first_name" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='lastName' placeholder='Last Name' type="text" name="last_name" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='company' placeholder='Company (optional)'type="text" name="company" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='address' placeholder='Address' type="text" name="address" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='city' placeholder='City' type="text" name="city" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='state' placeholder='State' type="text" name="state" maxLength="2" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='zip' placeholder='Zip Code' type="text" name="zip_code" maxLength="5" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='phone' placeholder='Phone Number' type="text" name="phone" maxLength="12" onChange={ e => {this.handleInputChange(e) }}/>
                        <input className='email' placeholder='Email (e.g. email@gmail.com)' type="text"  name="email"onChange={ e => {this.GmailCheck(e) }}/>
                        <input className='reTypeEmail' placeholder='Re-Type Email' onChange={ e => {this.handleCheckEmail(e) }}/>
                    </div>
                    <div className={'email-error' + (this.state.rightEmail ? '-false' : '-true')}>* MUST BE GMAIL *</div>
                    <div className={'reTypeEmail-error' + (this.state.checkEmail ? '-false' : '-true')}>* MUST MATCH EMAIL *</div>
                    <div className='register-buttons'>
                        <a href={process.env.REACT_APP_LOGIN}><button className='register-btn' onClick={this.handleButtonRegister} disabled={!this.state.rightEmail || !this.state.checkEmail}>REGISTER</button></a>
                        <Link to='/'><button className='regi-cancel-btn'>CANCEL</button></Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Register;