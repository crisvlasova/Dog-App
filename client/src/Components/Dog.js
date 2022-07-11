import React from 'react';
import '../StyleSheets/Dog.css'
import {Link} from 'react-router-dom';
// import DeleteDbDogs from '../Controllers/DeleteDbDogs';
// import { getAllDogsBack } from '../Redux/Actions/Actions';
// import { connect } from 'react-redux';

export function Dog (props) {

    // function handleClick (id,e) {
    //     e.preventDefault();
    //     DeleteDbDogs(id);
    // }

    return (
        <div className='dog-card' key={props.id}>
            <h2>Nombre: {props.name}</h2>
            <Link to={`/dog/${props.id}`}>
                <img src={props.img} alt='doguiimage' className='dog-card-image'/>
            </Link>
            {props.temperament && <p>Temperamentos: {props.temperament}</p>}
            {props.Temperaments && <p>Temperamentos: {props.Temperaments.map(temp => `${temp.name} `)}</p>}
            <p>Peso: {props.weight}</p>
            {/* {props.Temperaments && <button onClick={(e) => handleClick(props.id,e)}>X</button>} */}
        </div>
    )
}

// export const mapStateToProps = (state) => {
//     return {
//         allDogs: state.allDogs
//     }
// }

// export const mapDispatchToProps = (dispatch) => {
//     return {
//         getAllDogsBack: () => dispatch(getAllDogsBack())
//     }
// }

// export default connect (mapStateToProps, mapDispatchToProps)(Dog)