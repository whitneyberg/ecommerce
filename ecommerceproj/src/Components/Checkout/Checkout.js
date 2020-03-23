import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { getCartItems } from '../../services/cart.services';
import './checkout.css';
import { addToCart, updateCustomer, updateUser } from '../../redux/actions/actionCreators';
import { connect } from 'react-redux';
import Script from 'react-load-script';

// let bagSubTotal;

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: [],
            first_name: '',
            last_name: '',
            company: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            phone: '',
            email: '',
            paymentMthd: '',
            isUser: false,
            quoteamt: '',
            taxes: '',
            subtotal: '',
            total: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateCustomer = this.handleUpdateCustomer.bind(this);
    }

    componentDidMount(){
        // let checked = document.getElementById('route-widget').dataset.ischecked;
        // let quote = document.getElementById('route-widget').dataset.quoteamt;
        if(this.props.userInfo.id){
            let userid = this.props.userInfo.id;
            getCartItems(userid)
            .then(res => {
                if (res.status !== 200){
                  alert(res);
                }
                else {
                  this.setState({
                      cart: res.data,
                      first_name: this.props.userInfo.first_name,
                      last_name: this.props.userInfo.last_name,
                      company: this.props.userInfo.company,
                      address: this.props.userInfo.address,
                      city: this.props.userInfo.city,
                      state: this.props.userInfo.state,
                      zip_code: this.props.userInfo.zip_code,
                      phone: this.props.userInfo.phone,
                      email: this.props.userInfo.email,
                      isUser: true,
                    });
                  console.log(res.data);
                }
              })
        }
        else {
            const shoppingItems = this.props.cartReducer.cart;
            let totalArr = [0];
            let bagSubTotal;
            shoppingItems.map( shoppingItem => {
                return totalArr.push(Number((shoppingItem.price * shoppingItem.quantity).toFixed(2)));
            })
            function totalSum(numbers){
                bagSubTotal = numbers.reduce((a,b) => {
                    return a + b;
                }).toFixed(2)
            }
            totalSum(totalArr);
            let taxes = (bagSubTotal * 0.067).toFixed(2);
            let bagTotal = (Number(bagSubTotal) + Number(taxes)).toFixed(2);
            let routeQuote = (bagSubTotal * 0.01).toFixed(2);
            bagSubTotal = (Number(bagSubTotal) + Number(routeQuote)).toFixed(2);
            console.log(routeQuote);
            console.log(bagSubTotal);
            this.setState({
                cart: this.props.cartReducer.cart,
                quoteamt: routeQuote,
                taxes: taxes,
                subtotal: bagSubTotal,
                total: bagTotal
            });
        }

    }

    handleChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState })
        console.log(e.target.value);
    }

    handleUpdateCustomer(){
        this.props.updateCustomer(this.state);
    }

    render(){
        console.log(this.state);
        console.log(this.props.customerInfo);
        let today = moment().format('MMM DD, YYYY');
        return(
            <div className='checkout-wrap'>
                <div className='checkout-body'>
                    <h1>Contact & Shipping Info</h1>
                    <div className={'checkout-form' + (this.state.isUser ? '-off' : '-on')}>
                        <input className='checkout-first' placeholder='First Name'  name='first_name' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-last' placeholder='Last Name' name='last_name' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-company' placeholder='Company(optional)' name='company' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-address' placeholder='Address' name='address' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-city' placeholder='City' name='city' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-state' placeholder='State'  name='state' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-zip' placeholder='Zip Code' name='zip_code' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-phone' placeholder='Phone Number' name='phone' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-email' placeholder='Email' name='email' onChange={ e => {this.handleChange(e) }}/>
                        <input className='checkout-reTypeEmail' placeholder='Re-Type Email'/>
                    </div>

                    <div className={'checkout-user-info' + (this.state.isUser ? '-on' : '-off')}>
                        <div className='checkout-user-left'>
                            <p>{this.state.first_name} {this.state.last_name}</p>
                            <p>{this.state.company}</p>
                            <p>{this.state.address}</p>
                            <p>{this.state.city}, {this.state.state} {this.state.zip_code}</p>
                        </div>
                        <div className='checkout-user-right'>
                            <p>{this.state.phone}</p>
                            <p>{this.state.email}</p>
                            <p>Date: {today}</p>
                        </div>
                    </div>

                    <div className='payment-method'>
                        <p>Payment Method:</p>
                        <div className='payment-method-inputs'>
                            <input type='radio' name='paymentMthd' value='On Delivery' onChange={ e => {this.handleChange(e) }}/>
                            <label>On Delivery</label>
                            <input type='radio' name='paymentMthd' value='Mail' onChange={ e => {this.handleChange(e) }}/>
                            <label>Mail</label>
                        </div>
                    </div>
                    <div className='shipping-method'>
                        <p>Shipping Method:</p>
                        <div className='shipping-method-input'>
                            <label>Delivery Only</label>
                        </div>
                    </div>

                    <div className='total-price'>
                        <div className='subtotal-shipping-tax'>
                            <div className='subtotal'>
                                <h3>Subtotal</h3>
                                <p>${this.state.subtotal}</p>
                            </div>
                            <div className='shipping'>
                                <h3>Shipping</h3>
                                <p>$0.00</p>
                            </div>
                            <div className='tax'>
                                <h3>Tax 6.7%</h3>
                                <p>${this.state.taxes}</p>
                            </div>
                        </div>
                        <div className='price-divider'></div>
                        <div className='total'>
                            <h2>Total</h2>
                            <p>${this.state.total}</p>
                        </div>
                    </div>
                    <div className='checkout-button'>
                        <Link to='orderreview' onClick={this.handleUpdateCustomer}><button>REVIEW ORDER</button></Link>
                    </div>
                </div>
                <Footer />
                <Script url='http://d3is9nf54e5cww.cloudfront.net/RouteWidget.js'/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addToCart, updateCustomer, updateUser}) (Checkout);