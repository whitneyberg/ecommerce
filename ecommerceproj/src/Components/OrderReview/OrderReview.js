import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getAllOrders, createOrder, createOrderItem } from '../../services/order.services';
import OrderReviewItem from './OrderReviewItem/OrderReviewItem';
import { orderMailer } from '../../services/nodemailer.services';
import { deleteCartItems } from '../../services/cart.services';
import './orderReview.css';
import { addToCart, updateCustomer, updateUser, getCartItem, emptyCart } from '../../redux/actions/actionCreators';
import { connect } from 'react-redux';

class OrderReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNum: '',
            cart: [],
            first_name: '',
            last_name: '',
            company: '',
            address: '',
            city: '',
            usState: '',
            zip_code: '',
            phone: '',
            email: '',
            paymentType: '',
            date: '',
            subtotal: '',
            tax: '',
            total: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let totalArr = [0];
        let bagSubTotal;
        if(this.props.userInfo.id){
            const userItems = this.props.cartItem;
            userItems.map( userItem => {
                return totalArr.push(Number((userItem.price * userItem.quantity).toFixed(2)));
            })
            function totalSum(numbers){
                bagSubTotal = numbers.reduce((a,b) => {
                    return a + b;
                }).toFixed(2)
            }
            totalSum(totalArr);
            let taxes = (bagSubTotal * 0.067).toFixed(2);
            let bagTotal = (Number(bagSubTotal) + Number(taxes)).toFixed(2);
            let today = moment().format('MMMM DD, YYYY');
            this.setState({
                cart: this.props.customerInfo.cart,
                first_name: this.props.customerInfo.first_name,
                last_name: this.props.customerInfo.last_name,
                company: this.props.customerInfo.company,
                address: this.props.customerInfo.address,
                city: this.props.customerInfo.city,
                usState: this.props.customerInfo.state,
                zip_code: this.props.customerInfo.zip_code,
                phone: this.props.customerInfo.phone,
                email: this.props.customerInfo.email,
                paymentType: this.props.customerInfo.paymentMthd,
                date: today,
                subtotal: bagSubTotal,
                tax: taxes,
                total: bagTotal
            })
        }
        else {
            console.log(this.props.cartReducer.cart);
            const reviewItems = this.props.cartReducer.cart;
            reviewItems.map( reviewItem => {
                return totalArr.push(Number((reviewItem.price * reviewItem.quantity).toFixed(2)));
            })
            function totalSum(numbers){
                bagSubTotal = numbers.reduce((a,b) => {
                    return a + b;
                }).toFixed(2)
            }
            totalSum(totalArr);
            let taxes = (bagSubTotal * 0.067).toFixed(2);
            let bagTotal = (Number(bagSubTotal) + Number(taxes)).toFixed(2);
            let today = moment().format('MMMM DD, YYYY');
            this.setState({
                cart: this.props.cartReducer.cart,
                first_name: this.props.customerInfo.first_name,
                last_name: this.props.customerInfo.last_name,
                company: this.props.customerInfo.company,
                address: this.props.customerInfo.address,
                city: this.props.customerInfo.city,
                usState: this.props.customerInfo.state,
                zip_code: this.props.customerInfo.zip_code,
                phone: this.props.customerInfo.phone,
                email: this.props.customerInfo.email,
                paymentType: this.props.customerInfo.paymentMthd,
                date: today,
                subtotal: bagSubTotal,
                tax: taxes,
                total: bagTotal
            })
        }
        getAllOrders()
            .then( res => {
                this.setState({orderNum: res.data.length + 1});
            })
    }

    handleSubmit(){
        console.log('submit order button fired!')
        console.log(this.state);
        const {orderNum, cart, email, date, total, paymentType} = this.state;
        const order = {email, date, total, paymentType};
        createOrder(order)
            .then( res => res.data)
            .catch( err => {throw err} );
        this.props.updateCustomer({});
        if(this.props.userInfo.id){
            deleteCartItems(this.props.userInfo.id)
                .then( res => res.data )
                .catch( err => {throw err} );
            this.props.getCartItem({});
        }
        else {
            this.props.emptyCart();
        }
        cart.forEach((item) => {
            console.log(item);
            let productId = item.product_id;
            let productPrice = item.price;
            let productQty = item.quantity;
            let itemBody = {orderNum, productId, productPrice, productQty}
            createOrderItem(itemBody)
                .then( res => res.data )
                .catch( err => {throw err} );
        });
        const reqBody = {
            ...this.state,
        };
        orderMailer(reqBody)
        .then( res => res.data )
        .catch( err => {throw err});

    }


    render(){
        console.log(this.state);
        console.log(this.props.customerInfo);
        console.log(this.props.cartItem);
        const orderCartItems = this.state.cart;
        console.log(orderCartItems);
        const displayOrderItems = orderCartItems.map( orderCartItem => {
            const index = orderCartItems.indexOf(orderCartItem);
            return ( <OrderReviewItem
                        key={`orderItem${index}`}
                        index={index}
                        productid={orderCartItem.id}
                        productName={orderCartItem.name}
                        price={orderCartItem.price}
                        qty={orderCartItem.quantity}
            />)
        })
        return(
            <div className='or-wrap'>
                <div className='or-body'>
                    <h1>Order #{this.state.orderNum} Review</h1>
                    <div className='or-customer-info'>
                        <div className='or-customer-left'>
                            <p>{this.state.first_name} {this.state.last_name}</p>
                            <p>{this.state.company}</p>
                            <p>{this.state.address}</p>
                            <p>{this.state.city}, {this.state.usState} {this.state.zip_code}</p>
                        </div>
                        <div className='or-customer-right'>
                            <p>{this.state.phone}</p>
                            <p>{this.state.email}</p>
                            <p>Date: {this.state.date}</p>
                            <p>Shipping Method: Delivery</p>
                        </div>
                    </div>
                    <div className='or-items'>
                    {displayOrderItems}
                    </div>
                    <div className='or-price'>
                        <div className='or-price-subtotal'>
                            <div className='or-price-subtotal-text'>
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p>Tax 6.7%</p>
                            </div>
                            <div className='or-price-subtotal-numbers'>
                                <p>${this.state.subtotal}</p>
                                <p>$0.00</p>
                                <p>${this.state.tax}</p>
                            </div>
                        </div>
                        <div className='or-total'>
                            <div className='or-total-payment'>
                                <p>Payment Method:</p>
                                <p>{this.state.paymentType}</p>
                            </div>
                            <ul className='or-total-price'>
                                <li>Total</li>
                                <li>${this.state.total}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='or-button'>
                        <Link to='/thanks'><button onClick={this.handleSubmit}>SUBMIT ORDER</button></Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addToCart, updateCustomer, updateUser, getCartItem, emptyCart}) (OrderReview);
