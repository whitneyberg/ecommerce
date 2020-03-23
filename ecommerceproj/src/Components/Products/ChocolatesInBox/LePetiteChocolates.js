import React, { Component } from 'react';
import './lePetiteChocolates.css';

import SeaSalt from '../../../images/SeaSaltCaramel.jpg';
import Truffle from '../../../images/Truffle.jpg';
import Coconut from '../../../images/CoconutRough.jpg';
import Turtle from '../../../images/Turtle.jpg';

class LePetiteChocolates extends Component {
    render(){
        return(
            <div className='le-chocolates-in-box'>
                <div className='le-chocolates-description'>
                    <h1>Chocolates in the Box</h1>
                    <p>
                        Lucy’s hand-dipped chocolates are handcrafted with love and joy. If you’re not careful, you’ll eat all the chocolate you
                        buy from her in one sitting. It’s so good you won’t want to give it as a gift, you’ll want to eat it all yourself! If you find
                        yourself with a box of these amazing chocolates, make sure to enjoy every single bite, and then come back for more!
                    </p>
                </div>
                <div className='le-chocolates-wrap'>
                        <div className='le-chocolates'>
                            <img src={SeaSalt} alt='sea salt caramel in chocolate'/>
                            <h3>Sea Salt Caramel</h3>
                            <p>
                                Perfect caramel hand dipped in milk chocolate with a sprinkle of sea salt.
                                Balanced perfection of sweet ’n salty!
                            </p>
                        </div>
                        <div className='le-chocolates'>
                            <img src={Truffle} alt='chocolate truffle'/>
                            <h3>Mint Truffle</h3>
                            <p>
                                The creamiest smooth chocolate mint centers dipped in pure milk chocolate.
                                These may change life as you know it.
                            </p>
                        </div>
                        <div className='le-chocolates'>
                            <img src={Coconut} alt='coconut in chocolate'/>
                            <h3>Coconut Rough</h3>
                            <p>
                                Pure milk chocolate poured over pure coconut topped
                                with a sprinkle of roasted coconut. A pure and lasting favorite.
                            </p>
                        </div>
                        <div className='le-chocolates'>
                            <img src={Turtle} alt='chocolate turtle'/>
                            <h3>Pecan Turtle</h3>
                            <p>
                                Pecans + caramel + chocolate = love!
                                The ideal formula for yumminess.
                            </p>
                        </div>
                </div>
            </div>
        )
    }
}

export default LePetiteChocolates;