import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getDogsByRace, getAllRaces, getAllDogsBack } from '../Redux/Actions/Actions';

export function FilterByRace ({getAllDogsBack, getDogsByRace,getAllRaces, races}) {
    let loc = useLocation().pathname

    useEffect(() => {
        getAllRaces()
    },[]) //eslint-disable-line react-hooks/exhaustive-deps

    function filterDogs (e) {
        if (e.target.value === 'race'){
            getAllDogsBack()
        } else { 
        getDogsByRace(e.target.value);
        }
}
    return (
        <select className='filter' onChange={(e) => filterDogs(e)} disabled={loc === '/home'? false: true}>
            <option value ='race' key='race'>Elige una raza</option>
            {races.length !== 0 && races.map(race => {return (
                <option value={race} key={race}>{race}</option>
            )})}
        </select>
    )
}

export const mapStateToProps = (state) => {
    return {
        races: state.races
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getDogsByRace: (race) => dispatch(getDogsByRace(race)),
        getAllRaces: () => dispatch(getAllRaces()),
        getAllDogsBack: () => dispatch(getAllDogsBack()),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(FilterByRace)