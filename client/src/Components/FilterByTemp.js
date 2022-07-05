import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDogsByTemp, getAllTemperamentsBack } from '../Redux/Actions/Actions';

export function FilterByTemp ({getDogsByTemp, getAllTemperamentsBack, temperaments}) {
    useEffect(() => {
        getAllTemperamentsBack();
    },[]) //eslint-disable-line react-hooks/exhaustive-deps

    function handleChange (e) {
        e.preventDefault();
        if(e.target.value === 'temperaments') {
            return;
        } else {
        getDogsByTemp(e.target.value)
        }
    }

    return (
        <select className='filter' onChange={(e) => handleChange(e)}>
            <option key='temperaments' value ='temperaments'>Temperamentos</option>
            {temperaments.map(temp => { return (
                <option key={temp} value ={temp}>{temp}</option>
            )})}
        </select>
    )
}

export const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getDogsByTemp: (e) => dispatch(getDogsByTemp(e)),
        getAllTemperamentsBack: () => dispatch(getAllTemperamentsBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterByTemp)