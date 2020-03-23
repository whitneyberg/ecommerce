import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Footer from '../Footer/Footer';

import LePetite from '../../images/lePetite.jpg';
import HalfPound from '../../images/halfPound.jpg';
import OnePound from '../../images/onePound.jpg';
import RockyRoad from '../../images/rockyRoad.jpg';
import PretzelRod from '../../images/pretzelRod.jpg';
import Lollipop from '../../images/lollipop.jpg';
import Oreos from '../../images/oreos.jpg';
import Caramels from '../../images/caramels.jpg';

class Home extends Component {
  render() {
    return (
        <div className="home-wrap">
            <div className="body">
                <Link to='/products' className='hero-link'>
                    <div className="hero">
                        <p>Shop Now</p>
                    </div>
                </Link>
                <div className="body-content">
                    <Link to={`/lepetite/${8}`}><img src={LePetite} alt='small box of chocolates'/></Link>
                    <Link to={`/halfpound/${9}`}><img src={HalfPound} alt='half pound box of chocolates'/></Link>
                    <Link to={`/onepound/${10}`}><img src={`https://www.sarriscandies.com/images/380/0000001.jpg`} alt='one pound box of chocolates'/></Link>
                    <Link to={`/rockyroad/${1}`}><img src={RockyRoad} alt='rocky road'/></Link>
                    <Link to={`/pretzelrod/${2}`}><img src={PretzelRod} alt='pretzel rod'/></Link>
                    <Link to={`/lollipop/${4}`}><img src={Lollipop} alt='chocolate lollipop'/></Link>
                    <Link to={`/oreos/${5}`}><img src={Oreos} alt='oreos'/></Link>
                    <Link to={`/caramels/${6}`}><img src={Caramels} alt='caramels' className='caramels'/></Link>
                </div>
            </div>
            <Footer />
        </div>
    );
  }
}

export default Home;