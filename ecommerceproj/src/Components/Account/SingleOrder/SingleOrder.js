import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './singleOrder.css';
import { updateUser } from '../../../redux/actions/actionCreators'
import { connect } from 'react-redux';
import { getOrder, getOrderItems } from '../../../services/order.services'
import SingleOrderItem from './SingleOrderItem/SingleOrderItem';

class SingleOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            orderItems: []
        }

    }

    componentDidMount() {
        const orderid = this.props.match.params.id;
        console.log(orderid);
        getOrder(orderid)
            .then(res => {
                if (res.status !== 200) {
                    alert(res);
                }
                else {
                    this.setState({ order: res.data[0] });
                    console.log(res.data);
                }
            })
        getOrderItems(orderid)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res);
                }
                else {
                    this.setState({ orderItems: res.data });
                    console.log(res.data);
                }
            })

    }

    render() {
        let orderNumber = this.props.match.params.id;
        let firstName = this.props.userInfo.first_name;
        let lastName = this.props.userInfo.last_name;
        let company = this.props.userInfo.company;
        let address = this.props.userInfo.address;
        let city = this.props.userInfo.city;
        let usState = this.props.userInfo.state;
        let zipCode = this.props.userInfo.zip_code;
        let phone = this.props.userInfo.phone;
        let email = this.props.userInfo.email;
        let date = this.state.order['order_date'];
        let paymentType = this.state.order['payment_type'];
        console.log(this.state);
        let totalArr = [0];
        let bagSubtotal;
        const orderItems = this.state.orderItems;
        const displayOrderItems = orderItems.map(orderItem => {
            const index = orderItems.indexOf(orderItem);
            const itemTotal = (orderItem.price * orderItem.quantity).toFixed(2);
            totalArr.push(Number(itemTotal));
            return (<SingleOrderItem
                key={`orderItem${index}`}
                index={index}
                productid={orderItem.product_id}
                quantity={orderItem.quantity}
                price={orderItem.price}
                total={itemTotal}
                salesTax={orderItem.sales_tax}
            />)
        })
        function totalSum(numbers) {
            bagSubtotal = numbers.reduce((a, b) => {
                return a + b;
            }).toFixed(2)
        }
        totalSum(totalArr);
        let taxes = (bagSubtotal * 0.067).toFixed(2);
        let bagTotal = (Number(bagSubtotal) + Number(taxes)).toFixed(2);
        return (
            <div className='single-wrap'>
                <div className='single-body'>
                    <h1>Order #{orderNumber}</h1>
                    <div className='single-customer-info'>
                        <div className='single-customer-left'>
                            <p>{firstName} {lastName}</p>
                            <p>{company}</p>
                            <p>{address}</p>
                            <p>{city}, {usState} {zipCode}</p>
                        </div>
                        <div className='single-customer-right'>
                            <p>{phone}</p>
                            <p>{email}</p>
                            <p>Date: {date}</p>
                        </div>
                    </div>
                    <div className='single-items'>
                        {displayOrderItems}
                    </div>
                    <div className='single-price'>
                        <div className='single-price-subtotal'>
                            <div className='single-price-subtotal-text'>
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p>Tax 6.7%</p>
                            </div>
                            <div className='single-price-subtotal-numbers'>
                                <p>${bagSubtotal}</p>
                                <p>$0.00</p>
                                <p>${taxes}</p>
                            </div>
                        </div>
                        <div className='single-total'>
                            <div className='single-total-payment'>
                                <h4>Payment Method:</h4>
                                <p>{paymentType}</p>
                            </div>
                            <ul className='single-total-price'>
                                <li>Total</li>
                                <li>${bagTotal}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateUser })(SingleOrder);