import React, {Component} from 'react';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './about.css';
import Florence from '../../images/florenceprows.jpg'


class About extends Component {
    render(){
        return(
            <div className='about-wrap'>
                <div className='about-body'>
                    <h1>Why Lucy's Makes Chocolate</h1>
                    <div className='about-top'>
                        <p>
                            After 24 years of making chocolates and treats for family and friends, I put together a chocolate company
                            that reflects my love and devotion to this fine edible art, and to the memory of my Grandma.
                            <br/>
                            <br/>
                            In the later years of Grandma’s life, my husband and I had the wonderful opportunity of living with, and
                            caring for her. As each holiday season approached, I helped Grandma make her famous chocolate treats
                            creating timeless memories and sweet traditions.
                            <br/>
                            <br/>
                            Family stories tell of one snowy morning during the Great Depression when Grandpa — looking for work
                            in a difficult economy — found a $5 bill under the windswept snow. After much consideration on how the
                            newfound treasure should be spent, Grandma offered to take some of the money and purchase ingredients
                            to make candy to sell. Miraculously, her confections helped the family get through very difficult times.
                        </p>
                    </div>
                    <div className='about-bottom'>
                        <p>
                            In tribute to this great woman, I carry on the tradition of helping care for family and friends
                            by creating handcrafted, high-quality confections, just as she would have done.
                            <br/>
                            <br/>
                            I hope you enjoy them as much as I enjoy making them.
                            <br/>
                            <br/>
                            ~ Lucy
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default About;