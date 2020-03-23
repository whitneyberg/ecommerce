import React, { Component } from 'react';
// import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Chocolates from '../ChocolatesInBox/Chocolates';
import { createCartItems, getCartItems } from '../../../services/cart.services';
import { getProduct } from '../../../services/products.service';
import { addToCart, updateUser, getCartItem } from '../../../redux/actions/actionCreators'
import { connect } from 'react-redux';

import HalfPoundBox from '../../../images/halfPound.jpg';
import '../chocolates.css';

class HalfPound extends Component {
    constructor(props){
        super(props);
        this.state = {
            product_id: '',
            name: '',
            price: '',
            quantity: 1
        }
        this.handleAddToBag = this.handleAddToBag.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
    }

    componentWillMount(){
        let productid = this.props.match.params.productid;
        getProduct(productid)
            .then( res => {
                let productInfo = res.data[0];
                console.log(res.data[0]);
                this.setState({
                    product_id: productInfo.id,
                    name: productInfo.name,
                    price: productInfo.price
                });
          })
    }

    handleAddToBag(){
        if(this.props.userInfo.id){
            let user_id = this.props.userInfo.id;
            const { product_id, quantity } = this.state;
            const reqBody = {user_id, product_id, quantity};
            createCartItems(reqBody)
                .then( res => {
                    getCartItems(user_id)
                        .then( res => {
                            console.log(res.data);
                            this.props.getCartItem(res.data);
                        })
                })
                .catch( err => {throw err})
        }
        else {
            this.props.addToCart(this.state);
        }
    }

    handleQtyChange(e){
        let newState = this.state.qty;
        newState = Number(e.target.value);
        this.setState({ quantity: newState })
        console.log(e.target.value);
    }

    render(){
        console.log(this.state);
        console.log(this.props.cartReducer);
        console.log(this.props.cartItem);
        return(
            <div className='wrapper'>
                <div className='product-body'>
                    <div className='product-info'>
                        <div className='product-description'>
                            <h1>Half Pound Box</h1>
                            <div className='product-add'>
                                <button onClick={this.handleAddToBag}>Add To Cart</button>
                                <input placeholder='1' name='qty' onChange={ e => {this.handleQtyChange(e) }}/>
                                <h3>$14.95</h3>
                            </div>
                            <p>
                                Lucy’s Half Pound box of chocolates are a perfect gift for two,
                                or for one who really really loves chocolate. This box contains
                                3 Sea Salt Caramels, 3 Mint Truffles, 2 Almond Clusters,
                                2 Coconut Roughs, and 2 Pecan Turles.
                            </p>
                            <div className='product-ingredients'>
                                <h3>Ingredients</h3>
                                <p>
                                Chocolate, coconut, caramel, almonds, and roasted pecans,  Contains milk and nuts. Gluten-free.
                                </p>
                            </div>
                        </div>
                        <div className='product-picture'>
                            <img src={HalfPoundBox} alt='box of chocolates'/>
                        </div>
                    </div>
                    <Chocolates />
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {addToCart, updateUser, getCartItem}) (HalfPound);