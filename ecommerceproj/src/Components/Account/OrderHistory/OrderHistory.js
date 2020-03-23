import React, { Component } from 'react';
import Footer from '../../Footer/Footer';
import Order from './Order/Order';
import { getOrders } from '../../../services/order.services';
import './orderHistory.css';
import { updateUser, updateOrder } from '../../../redux/actions/actionCreators'
import { connect } from 'react-redux';

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
        this.pullFromBackend = this.pullFromBackend.bind(this);
    }

    componentDidMount(){
        const email = this.props.userInfo.email;
        this.pullFromBackend(email);
    }

    pullFromBackend( email ){
        getOrders( email )
          .then( res => {
            if (res.status !== 200) {
                alert(res);
            }
            else {
              this.setState({ orders: res.data });
              console.log(res.data);
            }
          })
          .catch(err => {throw err});
    }

    render(){
        const email = this.props.userInfo.email;
        const orders = this.state.orders;
        console.log(email);
        console.log(orders);
        const displayOrders = orders.map( (order, index) => {
            const id = order.id;
            return( <Order
                        key={`orderItem${index}`}
                        id={id}
                        orderDate={order.order_date}
                        orderPrice={order.order_price}
                    />
            );
        })
        return(
            <div className='history-wrap'>
                <div className='history-body'>
                    <h2>Order History</h2>
                    <div className='order-history'>
                        {displayOrders}
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


export default connect(mapStateToProps, {updateUser, updateOrder}) (OrderHistory);