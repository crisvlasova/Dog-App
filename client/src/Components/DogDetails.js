import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearDetails, getDogById } from '../Redux/Actions/Actions';
import '../StyleSheets/DogDetails.css'
import gif from '../Images/giphy.gif'


export function DogDetails ({dogDetails, getDogById, clearDetails}) {

    const id = useParams().dogId

    useEffect(() => {
        getDogById(id);
        return clearDetails()
    },[id])  //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className='dog-details-card'>
            <br/>
            <br/>
            {!Object.entries(dogDetails).length && <img src={gif} alt='giphy' className='giphy'/>}
            {Object.entries(dogDetails).length >0 && (
                <div className='dog-info'>
                    <h3>Nombre: {dogDetails.name}</h3>
                    <img src={dogDetails.image} alt='dogDetailsImage' className='dog-details-image'/>
                    <h4>Temperamentos: {dogDetails.Temperaments && dogDetails.Temperaments.map(temp => `${temp.name}, `)}
                                       {dogDetails.temperament && <>{dogDetails.temperament}</>}
                    </h4>
                    <h4>Peso: {dogDetails.weight} kg</h4>
                    <h4>Altura: {dogDetails.height} cm</h4>
                    <h4>Años de vida: {dogDetails.life_span}</h4>
                    </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dogDetails: state.dogDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDogById: (id) => dispatch(getDogById(id)),
        clearDetails: () => dispatch(clearDetails())
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(DogDetails)