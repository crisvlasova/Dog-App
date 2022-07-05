import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setIndexOfFirstDog, setIndexOfLastDog, setCurrentPage } from '../Redux/Actions/Actions';
import '../StyleSheets/Pagination.css'

export function Pagination ({ postPerPage, indexOfLastDog, indexOfFirstDog,  setIndexOfLastDog, setIndexOfFirstDog, currentPage, setCurrentPage, allDogs }) {

    useEffect(() => {
        setIndexOfLastDog(currentPage);
        setIndexOfFirstDog(indexOfLastDog);
    },[currentPage, indexOfFirstDog, indexOfLastDog]) //eslint-disable-line react-hooks/exhaustive-deps

    let indexes = []
    let dogsLength = allDogs.length
    let numberOfPaginations = Math.ceil(dogsLength/postPerPage)
    for (let i = 1; i <= numberOfPaginations; i++) {
        indexes.push(i)
    }

    function handleClick (e) {
        e.preventDefault();
        setCurrentPage(e.target.value);
        setIndexOfLastDog(e.target.value);
        setIndexOfFirstDog(indexOfLastDog);
    }

    return (
        <div className='pagination-container'>
            {indexes.map(index => {return (
                <button className='pagination-button' onClick={(e) => {handleClick(e)}} value={index} key={index}>{index}</button>
            )})}
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        postPerPage: state.postPerPage,
        dogsLength: state.dogsLength,
        indexOfLastDog: state.indexOfLastDog,
        indexOfFirstDog: state.indexOfFirstDog,
        currentPage: state.currentPage
    }
}

export const mapDispatchToProps = (dispatch => {
    return {
        setIndexOfLastDog: (e) => dispatch(setIndexOfLastDog(e)),
        setIndexOfFirstDog: (e) => dispatch(setIndexOfFirstDog(e)),
        setCurrentPage: (e) => dispatch(setCurrentPage(e))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)