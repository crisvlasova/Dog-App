import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllDogsBack, setIndexOfFirstDog, setIndexOfLastDog } from '../Redux/Actions/Actions.js';
import {Dog} from './Dog.js'
import Pagination from './Pagination.js';
import gif from '../Images/giphy.gif'
import '../StyleSheets/Dogs.css'

export function Dogs ({allDogs, currentPage, indexOfFirstDog, indexOfLastDog, getAllDogsBack, setIndexOfFirstDog, setIndexOfLastDog}) {
    useEffect(() => {
            setIndexOfLastDog(currentPage);
            setIndexOfFirstDog(indexOfLastDog);
    }, [indexOfFirstDog, indexOfLastDog, currentPage]) //eslint-disable-line react-hooks/exhaustive-deps
    // console.log(allDogs)
    useEffect(() => {
        getAllDogsBack()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const slicedDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    return (
        <div className='alldogs-pagination-container'>
            <div className='all-dogs-container'>
            {!allDogs.length && <img src={gif} alt='giphy'className='loading'/>}
            {slicedDogs && slicedDogs.map(dog => {
                return (
                    <div key={dog.id + dog.name}>
                    <Dog
                      name={dog.name}
                      img={dog.image}
                      temperament={dog.temperament}
                      Temperaments={dog.Temperaments}
                      weight={dog.weight}
                      id={dog.id}
                    />
                    </div>
                )
            })}
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        currentPage: state.currentPage,
        indexOfFirstDog: state.indexOfFirstDog,
        indexOfLastDog: state.indexOfLastDog,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDogsBack: () => dispatch(getAllDogsBack()),
        setIndexOfFirstDog: (e) => dispatch(setIndexOfFirstDog(e)),
        setIndexOfLastDog: (e) => dispatch(setIndexOfLastDog(e)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dogs)