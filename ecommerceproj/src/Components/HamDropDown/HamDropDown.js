import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { getUid } from '../../utilities/uid';
import '../Header/header.css';


export default class HamDropdown extends Component {
    constructor(){
        super()
        this.state = {
            open: false,
            currentTimeout: null,
            loggedIn: false
        }
    }

    toggle(){
        // debugger;
        if (this.state.currentTimeout !== null) {
            return;
        }

        this.setState({
            // open: true
            open: !this.state.open,
            // currentTimeout: setTimeout(() => this.setState({ currentTimeout: null }), 50),
        });
    }

    handleClick(e) {
        console.log('clicked on ', e.target);
        this.toggle();
    }

    render () {
        const { img, logout, loggedIn } = this.props;
        return (
            <div className='ham-wrap'>

                <div onClick={this.handleClick.bind(this)} className={this.props.className}>
                    <img src={this.props.img} alt=''/>
                </div>
                <div className={'backdrop ' + (this.state.open ? 'open' : '')} onClick={this.handleClick.bind(this)}/>
                {this.state.open &&
                <div className={`${this.props.className} ham-dropdown-menu`} >
                    <div onClick={this.handleClick.bind(this)} className='ham-menu-items'><Link to='/products'>Products</Link></div>
                    <div onClick={this.handleClick.bind(this)} className='ham-menu-items'><Link to='/about'>About</Link></div>
                    <div onClick={this.handleClick.bind(this)} className='ham-menu-items'><Link to='/contact'>Contact</Link></div>
                    <div onClick={this.handleClick.bind(this)} className={loggedIn ? 'ham-false' : 'ham-true'}><Link to='/register'>Register</Link></div>
                    <div onClick={this.handleClick.bind(this)} className={loggedIn ? 'ham-false' : 'ham-true'}><a href={process.env.REACT_APP_LOGIN}>Login</a></div>
                    <div onClick={this.handleClick.bind(this)} className={loggedIn ? 'ham-account-true' : 'ham-false'}><Link to='/dashboard'>Account</Link></div>
                    <div onClick={this.handleClick.bind(this)} className={loggedIn ? 'ham-account-true' : 'ham-false'}><Link to='/logout' onClick={logout}>Logout</Link></div>
                </div>}
            </div>
        )
    }
}