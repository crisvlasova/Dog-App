import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { searchDogs } from '../Redux/Actions/Actions.js'
import logo from '../Images/icons8-dog-64.png'
import '../StyleSheets/SearchBar.css';


export function SearchBar ({searchedDogs, searchDogs}) {
    // eslint-disable-next-line
    const [dog, setDog] = useState('');
    const [query, setQuery] = useState('')

    useEffect(() => {
        searchDogs(query);
        setDog(searchedDogs)
    },[query]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div className='wrapper'>
        <div className='search-input'>
            <input
            key='input-search'
            type='text'
            placeholder=' Introduce un perro'
            onChange={(e)=> setQuery(e.target.value)}
            value={query}
            />
            <div className='autocom-box'>
                {query && searchedDogs.map(dog => {
                    return( 
                        <div  key={dog.id} className='logo-dog'>
                            <Link to={`/dog/${dog.id}`} >
                                <li ><img src={logo} alt='icon-logo' className='logo-icon' /> {dog.name}</li>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
  </div>
    )
}

let mapStateToProps = (state) => {
    return {
        searchedDogs: state.searchedDogs
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchDogs: (name) => dispatch(searchDogs(name))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);