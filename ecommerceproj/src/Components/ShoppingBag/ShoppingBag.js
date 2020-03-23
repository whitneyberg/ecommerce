import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { addToCart, updateUser, emptyCart, getCartItem } from '../../redux/actions/actionCreators';
import { getCartItems, deleteCartItems } from '../../services/cart.services';
import { connect } from 'react-redux';
import ShoppingBagItem from './ShoppingBagItem/ShoppingBagItem';
import './shoppingBag.css';

class ShoppingBag extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: []
        }
        this.clearBag = this.clearBag.bind(this);
    }

    componentDidMount(){
        if(this.props.userInfo.id){
            let userid = this.props.userInfo.id;
            getCartItems(userid)
            .then(res => {
                if (res.status !== 200){
                  alert(res);
                }
                else {
                  this.setState({ cart: res.data });
                  console.log(res.data);
                }
              })
        }
        else {
            this.setState({ cart: this.props.cartReducer.cart});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({cart: nextProps.cartReducer.cart});
    }

    clearBag(){
        if(this.props.userInfo.id){
            deleteCartItems(this.props.userInfo.id)
                .then( res => res.data )
                .catch( err => {throw err} );
            this.props.getCartItem({});
        }
        else {
            this.props.emptyCart();
        }
    }

    render(){
        const shoppingItems = this.state.cart;
        console.log(shoppingItems);
        let totalArr = [0];
        let bagSubTotal;
        console.log(totalArr);
        const displayOrderItems = shoppingItems.map( shoppingItem => {
            const index = shoppingItems.indexOf(shoppingItem);
            totalArr.push(Number((shoppingItem.price * shoppingItem.quantity).toFixed(2)));
            return ( <ShoppingBagItem
                        key={`orderItem${index}`}
                        index={index}
                        productid={shoppingItem.id}
                        productName={shoppingItem.name}
                        price={shoppingItem.price}
                        qty={shoppingItem.quantity}
            />)
        })
        function totalSum(numbers){
            bagSubTotal = numbers.reduce((a,b) => {
                return a + b;
            }).toFixed(2)
        }
        totalSum(totalArr);
        let taxes = (bagSubTotal * 0.067).toFixed(2);
        let bagTotal = (Number(bagSubTotal) + Number(taxes)).toFixed(2);
        return(
            <div className='shopping-wrap'>
                <div className='shopping-body'>
                    <h1>Items in Your Bag</h1>
                    <div className='clear-bag-btn'>
                        <button onClick={this.clearBag}>Clear Bag</button>
                    </div>
                    {displayOrderItems}
                    <div className='bag-price'>
                        <div className='bag-subtotal'>
                            <div className='bag-subtotal-text'>
                                <p>Subtotal</p>
                                <p>Shipping</p>
                                <p>Tax 6.7%</p>
                            </div>
                            <div className='bag-subtotal-numbers'>
                                <p>${bagSubTotal}</p>
                                <p>$0.00</p>
                                <p>${taxes}</p>
                            </div>
                        </div>
                        <div className='bag-total'>
                            <p>Total</p>
                            <p>${bagTotal}</p>
                        </div>
                    </div>
                    <div className='bag-checkout-button'>
                        <Link to='/checkout'><button>CHECKOUT</button></Link>
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

export default connect(mapStateToProps, {addToCart, updateUser, emptyCart, getCartItem}) (ShoppingBag);