import React from 'react';
import '../StyleSheets/Dog.css'
import {Link} from 'react-router-dom';

export default function Dog (props) {
    return (
        <div className='dog-card' key={props.id}>
            <h2>Raza: {props.name}</h2>
            <Link to={`/dog/${props.id}`}>
                <img src={props.img} alt='doguiimage' className='dog-card-image'/>
            </Link>
            <p>Temperamento: {props.temperament}</p>
            <p>Peso: {props.weight}</p>
        </div>
    )
}
