import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { order } from '../Redux/Actions/Actions'
import '../StyleSheets/Filter.css'

export function OrderBy ({order}) {
    let loc = useLocation().pathname

    function handleClick (e) {
        e.preventDefault()
        order(e.target.value)
    }

    return (
        <select className='filter' onChange={(e)=> handleClick(e)} disabled={loc === '/home'? false: true}>
            <option key ='order-by'value='order-by'>Ordenar por...</option>
            <option key='alfabet-AZ' value='alfabet-AZ'>A - Z</option>
            <option key='alfabet-ZA' value='alfabet-ZA'>Z - A</option>
            <option key='weight-min-maj' value='weight-min-maj'>Peso Menor-Mayor</option>
            <option key='weight-maj-min' value='weight-maj-min'>Peso Mayor-Menor</option>
        </select>
    )
}

export const mapDispatchToProps = (dispatch) => {
    return {
        order: (e) => dispatch(order(e)),
    }
}

export default connect (null, mapDispatchToProps)(OrderBy)