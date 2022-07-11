import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {getDogsApiDb, getDbDogs } from '../Redux/Actions/Actions.js'

export function FilterByApiDb ({dbDogs, getDogsApiDb,getDbDogs}) {
    let loc = useLocation().pathname

    useEffect(() => {
        getDbDogs()
    },[]) //eslint-disable-line react-hooks/exhaustive-deps

    function handleChange (e) {
        e.preventDefault();
        getDogsApiDb(e.target.value);
    }
    return (
        <select className='filter' onChange={(e) => handleChange(e)} disabled={loc === '/home'? false: true}>
            <option key='filter-by' name='filter-by'>Filtrar por Api/Db</option>
            <option key='all-dogs' name='all-dogs' >Todos los perros</option>
            <option key='api-dogs' name='api-dogs' >Api</option>
            <option key='db-dogs' name='db-dogs' disabled={dbDogs.length? false : true}>Db</option>
        </select>
    )
}

export const mapStateToProps = (state) => {
    return {
        dbDogs: state.dbDogs
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getDogsApiDb: (e) => dispatch(getDogsApiDb(e)),
        getDbDogs: () => dispatch(getDbDogs()),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(FilterByApiDb)