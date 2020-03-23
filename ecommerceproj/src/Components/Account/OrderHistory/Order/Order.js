import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../orderHistory.css';
import { updateUser } from '../../../../redux/actions/actionCreators';
import { connect } from 'react-redux';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        const { id, orderDate, orderPrice } = this.props;
        return(
                <Link to={`/singleorder/${id}`}>
                    <div className='single-order'>
                        <div className='order-num-date'>
                            <p>Order Number: {id}</p>
                            <p>Date: {orderDate}</p>
                        </div>
                        <p>Price: ${orderPrice}</p>
                    </div>
                </Link>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateUser}) (Order);