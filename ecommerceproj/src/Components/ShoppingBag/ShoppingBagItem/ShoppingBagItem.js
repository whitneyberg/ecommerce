import React, { Component } from 'react';
import { addToCart } from '../../../redux/actions/actionCreators'
import { connect } from 'react-redux';
import '../shoppingBag.css';

class ShoppingBagItem extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    // handleRemove = () => {
    //     let bagArray = this.props.cartReducer.cart;
    //     for(let i = 0; i < bagArray.length; i++){
    //         bagArray.splice([i], 1);
    //     }
    // }

    render(){
        const { productName, price, qty } = this.props;
        const total = (price * qty).toFixed(2);
        return(
            <div className='shopping-bag-item'>
                <h4>{productName}</h4>
                <div className='shopping-item-total'>
                    <div>${price}</div>
                    <div>Qty: {qty}</div>
                    <div className='item-total'>${total}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addToCart}) (ShoppingBagItem);