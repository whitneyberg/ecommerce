import React, { Component } from 'react';
import { getProduct } from '../../../../services/products.service';
import '../singleOrder.css';
import { updateUser } from '../../../../redux/actions/actionCreators';
import { connect } from 'react-redux';

class SingleOrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.pullFromBackend = this.pullFromBackend.bind(this);
    }

    componentWillMount(){
        const { productid } = this.props;
        this.pullFromBackend(productid);
    }

    pullFromBackend( productid ){
        getProduct( productid )
          .then( res => {
            if (res.status !== 200) {
                alert(res);
            }
            else {
              this.setState({ products: res.data });
              console.log(res.data);
            }
          })
          .catch(err => {throw err});
    }

    render(){
        const { price, quantity, total } = this.props;
        const products = this.state.products;
        console.log(products);
        const displayProducts = products.map( product => {
            const index = products.indexOf(product);
            return (
                <h4 key={`product-${index}`} value={product.name}>{product.name}</h4>
            )
        })
        return(
            <div className='single-item1'>
                {displayProducts}
                <div className='single-price-qty'>
                    <p>${price}</p>
                    <p>Qty: {quantity}</p>
                    <p>${total}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}


export default connect(mapStateToProps, {updateUser}) (SingleOrderItem);