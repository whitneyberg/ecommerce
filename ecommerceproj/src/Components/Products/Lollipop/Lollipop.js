import React, { Component } from 'react';
// import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { createCartItems, getCartItems } from '../../../services/cart.services';
import { getProduct } from '../../../services/products.service';
import { addToCart, updateUser, getCartItem } from '../../../redux/actions/actionCreators'
import { connect } from 'react-redux';

import LollipopPic from '../../../images/lollipop.jpg';
import '../chocolates.css';

class Lollipop extends Component {
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
                            <h1>Caramel Lollipop</h1>
                            <div className='product-add'>
                                <button onClick={this.handleAddToBag}>Add To Cart</button>
                                <input placeholder='1' name='qty' onChange={ e => {this.handleQtyChange(e) }}/>
                                <h3>$1.75</h3>
                            </div>
                            <p>
                                Lucy’s Caramel Lollipop is one of the most delicious chocolate confections in the world.
                                Heaven on a stick. Handmade caramel dipped in chocolate. When you first hold this lollipop
                                you feel like a child again.
                            </p>
                            <div className='product-ingredients'>
                                <h3>Ingredients</h3>
                                <p>
                                    Chocolate and caramel.  Contains milk. Gluten-free.
                                </p>
                            </div>
                        </div>
                        <div className='product-picture'>
                            <img src={LollipopPic} alt='rocky road'/>
                        </div>
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

export default connect(mapStateToProps, {addToCart, updateUser, getCartItem}) (Lollipop);