import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './products.css';
import Footer from '../Footer/Footer';

import LePetite from '../../images/LePetite-top.jpg';
import HalfPound from '../../images/HalfPound-Top.jpg';
import OnePound from '../../images/OnePound-top.jpg';
import TwoPound from '../../images/twoPound.png';
import RockyRoad from '../../images/rockyRoad.jpg';
import PretzelRod from '../../images/pretzelRod.jpg';
import Lollipop from '../../images/lollipop.jpg';
import Oreos from '../../images/oreos.jpg';
import Caramels from '../../images/caramels.jpg';
import Licorice from '../../images/grandmasLicoriceCaramel.jpg';

class Products extends Component {
    render() {
        return (
            <div className="products-wrap">
                <div className="products-body">
                    <div className="boxes-wrap">
                        <h1>Boxed Chocolates</h1>
                        <p>
                            Lucy’s boxed chocolates are full of flavor and joy with each and every bite. When you take that first bite you better be
                            holding on to something, because you might fall to the ground from the amazing taste. They are so perfect you will
                            hide them from other people. You may even lie that you have some. Just don’t hide them in your pocket.
                    </p>
                        <div className='boxes'>
                            <Link to={`/lepetite/${8}`} className='boxes-pictures'>
                                <img src={LePetite} alt='small box of chocolates' />
                                <h3> Le Petite <br /> $4.95 </h3>
                            </Link>
                            <Link to={`/halfpound/${9}`} className='boxes-pictures'>
                                <img src={HalfPound} alt='half pound box of chocolates' />
                                <h3> Half Pound <br /> $14.95 </h3>
                            </Link>
                            <Link to={`/onepound/${10}`} className='boxes-pictures'>
                                <img src={OnePound} alt='one pound box of chocolates' />
                                <h3> One Pound <br /> $29.95 </h3>
                            </Link>
                            <Link to={`/twopound/${11}`} className='boxes-pictures'>
                                <img src={TwoPound} alt='two pound box of chocolates' />
                                <h3> Two Pound <br /> $59.95 </h3>
                            </Link>
                        </div>
                    </div>

                    <div className="confections-wrap">
                        <h1>Chocolate Confections</h1>
                        <p>
                            Lucy’s chocolate confections are prepared and hand-dipped with love and care. Each one of these beautiful
                            confections are delicious and bring comfort to the soul. These are great as gifts for any occasion.
                            Or if you just want to be selfish you can buy them for yourself too! Just be sure to wipe your
                            face off when you’re done.
                    </p>
                        <div className='confections'>
                            <Link to={`/rockyroad/${1}`} className='confections-pictures'>
                                <img src={RockyRoad} alt='rocky road' />
                                <h3> Rocky Road <br /> $3.75 </h3>
                            </Link>
                            <Link to={`/pretzelrod/${2}`} className='confections-pictures'>
                                <img src={PretzelRod} alt='pretzel rod' />
                                <h3> Pretzel Rod <br /> $2.49 </h3>
                            </Link>
                            <Link to={`/lollipop/${4}`} className='confections-pictures'>

                                <img src={Lollipop} alt='chocolate lollipop' />
                                <h3> Caramel Lollipop <br /> $1.75 </h3>
                            </Link>
                            <Link to={`/oreos/${5}`} className='confections-pictures'>
                                <img src={Oreos} alt='oreos' />
                                <h3> Chocolate Dipped Oreos <br /> $0.60 </h3>
                            </Link>
                            <Link to={`/caramels/${6}`} className='confections-pictures'>
                                <img src={Caramels} alt='caramels' />
                                <h3> Grandma’s Caramels <br /> $0.60 </h3>
                            </Link>
                            <Link to={`/licorice/${7}`} className='confections-pictures'>
                                <img src={Licorice} alt='licorice' />
                                <h3> Grandma’s Licorice Caramels <br /> $0.60 </h3>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Products;