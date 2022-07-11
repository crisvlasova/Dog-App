import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from '../Images/icons8-dog-64.png'
import '../StyleSheets/NavBar.css'
import OrderBy from './OrderBy';
import FilterByTemp from './FilterByTemp';
import FilterByRace from './FilterByRace';
import FilterByApiDb from './FilterByApiDb';

export default function NavBar () {
    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={logo} alt='dog-paw' className='dog-icon'/>
            </Link>
                <h4 className='dog-app-title'>Dog App</h4>
            <div>
                <SearchBar/>
            </div>
            <Link to ='/createDog' className='create-dog-link'><h4>Crear un perro</h4></Link>
            <div className='filter-container'>
                <OrderBy/>
                <FilterByTemp/>
                <FilterByRace/>
                <FilterByApiDb/>
            </div>
            <Link to='/home'>
                <button className='home-dogs-buttons'>Ver perros</button>
            </Link>
        </div>
    )
}