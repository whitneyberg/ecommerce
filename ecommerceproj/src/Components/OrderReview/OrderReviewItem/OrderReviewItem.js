import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions/actionCreators'
import '../orderReview.css';

class OrderReviewItem extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const { productName, price, qty } = this.props;
        const total = (price * qty).toFixed(2);
        console.log(this.props);
        return(
            <div className='order-review-item'>
                <h4>{productName}</h4>
                <div className='order-review-item-total'>
                    <div>${price}</div>
                    <div>Qty: {qty}</div>
                    <div>${total}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addToCart}) (OrderReviewItem);