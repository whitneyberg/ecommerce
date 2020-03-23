import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
// import { getUserFromEmail } from '../../../services/account.services';
import { getCartItems } from '../../../services/cart.services';
// import 'dashboard.css'
import { updateUser, getCartItem } from '../../../redux/actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            first_name: '',
            last_name: '',
            company: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            phone: '',
            email: '',
            user: {}
        }
    }

    componentWillMount(){
        axios.get('/check').then(resp => {
            console.log(resp.data);
            this.props.updateUser(resp.data[0]);
            getCartItems(resp.data[0].id)
                .then( res => {
                    this.props.getCartItem(res.data)
                })
        })
    }


    render(){
        let { id, first_name, last_name, company, address, city, state, zip_code, phone, email } = this.props.userInfo;
        console.log(this.props.userInfo);
        console.log(this.state);
        // console.log(this.props.match.params.id);
        return(
            <div className='dash-wrap'>
                <div className='dash-body'>
                    <div className='dash-header'>
                        Hello, {first_name}!
                    </div>
                    <div className='dash-info'>
                        <ul className='dash-user-info'>
                            <li className='dash-user1'>{first_name} {last_name}</li>
                            <li className='dash-user2'>{company}</li>
                            <li className='dash-user3'>{address}</li>
                            <li className='dash-user4'>{city}, {state} {zip_code}</li>
                            <li className='dash-user5'>{phone}</li>
                            <li className='dash-user6'>{email}</li>
                        </ul>
                        <ul className='dash-links'>
                            <Link to={`/changeinfo/${id}`}><button>Change Account Info</button></Link>
                            <Link to={`/orderhistory`}><button>Order History</button></Link>
                        </ul>
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


export default connect(mapStateToProps, {updateUser, getCartItem}) (Dashboard);