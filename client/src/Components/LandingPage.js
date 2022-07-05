import React from 'react';
import {Link} from 'react-router-dom';
import '../StyleSheets/LandingPage.css'
import logo from '../Images/icons8-dog-64.png'

export default function LandingPage () {
    return (
        <div className='landing-page-container'>
            <br/>
            <br/>
            <h1 className='Dogs-landing'>Dogs</h1>
            <div className='doguilogo-clickme'>
                <Link to='/home'><img src={logo} alt='doguilogo' className='doguilogo'/></Link>
                <h3>Click me!</h3>
            </div>
        </div>
    )
}