import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Nuts from '../../images/nuts.jpg';
import BoxOfChocolate from '../../images/BoxOfChocolates.jpg';
import './contact.css';
import { contact } from '../../services/nodemailer.services';
import { setTimeout } from 'timers';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            subject: '',
            message: '',
            fullFields: false,
            submitted: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        console.log('submit message button fired!')
        console.log(this.state);
        const { firstName, lastName, company, email, subject, message } = this.state;
        const reqBody = { firstName, lastName, company, email, subject, message };
        contact(reqBody)
            .then( res => res.data )
            .catch( err => {throw err});
        this.setState({
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            subject: '',
            message: '',
            fullFields: false,
            submitted: true
        });
        setTimeout( () => {
            this.setState({submitted: false});
        }, 4000);
    }

    handleInputChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState })
        console.log(e.target.value);
        console.log(this.state);
        if(this.state.firstName.length && this.state.lastName.length && this.state.company.length && this.state.email.length && this.state.subject.length && this.state.message.length > 0){
            this.setState({fullFields: true});
        }
    }


    render(){
        return(
            <div className='contact-wrap'>
                <div className='contact-body'>
                    <h1>Contact Me</h1>
                    <p>
                        Please fill out this form with any questions, comments, or orders
                        and I will respond to you shortly. Thank you.
                    </p>
                    <div className={'contact-form' + (this.state.submitted ? '-true' : '-false')}>
                        <div className='contact-form-left'>
                            <input className='contact-input' value={this.state.firstName} placeholder='First Name' name='firstName' type='text' onChange={ e => {this.handleInputChange(e) }}/>
                            <input className='contact-input' value={this.state.lastName} placeholder='Last Name' name='lastName' type='text' onChange={ e => {this.handleInputChange(e) }}/>
                            <input className='contact-input' value={this.state.company} placeholder='Company' name='company' type='text' onChange={ e => {this.handleInputChange(e) }}/>
                            <input className='contact-input' value={this.state.email} placeholder='Email' name='email' type='text' onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                        <div className='contact-form-right'>
                            <input className='contact-input' value={this.state.subject} placeholder='Subject' name='subject' type='text' onChange={ e => {this.handleInputChange(e) }}/>
                            <textarea className='contact-input' value={this.state.message} placeholder='Message' name='message' type='text' onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                    </div>
                    <div className={'submitted' + (this.state.submitted ? '-true' : '-false')}>
                        <p>Thank you for contacting us!<br/>We will be in contact with you soon.</p>
                    </div>
                    <div className={'contact-button' + (this.state.submitted ? '-true' : '-false')}>
                        <button onClick={(e) => {this.handleSubmit()}} disabled={!this.state.fullFields || this.state.submitted}>{this.state.submitted ? "SENT" : "SUBMIT"}</button>
                    </div>
                    <div className='contact-images'>
                        <img src={Nuts} alt='nuts in chocolate'/>
                        <img src={BoxOfChocolate} alt='box of chocolates' className='BoxOfChocolates'/>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Contact;