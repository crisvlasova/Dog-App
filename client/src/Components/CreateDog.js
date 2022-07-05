import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchTemps } from '../Redux/Actions/Actions.js';
import { postMyDogs } from '../Controllers/postMyDogs.js';
import logo from '../Images/pomeranian-dog-black.gif';
import '../StyleSheets/CreateDog.css';

export function CreateDog ({searchedTemps, searchTemps}) {
    // eslint-disable-next-line
    const [tempList, setTempsList] = useState('');
    const [query, setQuery] = useState('');
    const [formValues, setFormValues] = useState({
        name: '',
        min_life_span: '',
        max_life_span: '',
        min_weight: '',
        max_weight: '',
        min_height: '',
        max_height: '',
        image: '',
        temperament: []
    });
    const [error, setError] = useState({
        nameError: '',
        min_life_spanError: '',
        max_life_spanError: '',
        min_weightError: '',
        max_weightError: '',
        min_heightError: '',
        max_heightError: ''
    })

    useEffect(() => {
        searchTemps(query);
        setTempsList(searchedTemps);
    },[query])  //eslint-disable-line react-hooks/exhaustive-deps

    function handleClick (t,e) {
        e.preventDefault();
        if(formValues.temperament.length === 5) {
            return alert(`Solo pueden agregarse hasta 5 temperamentos`)
        }
        const found = formValues.temperament.find(temp => temp === t);
        if (found){
            return alert(`No se pueden agregar dos temperamentos con el mismo nombre`)
        }
        formValues.temperament.push(t);
        alert(`Se ha añadido el temperamento ${t}`);
        console.log(formValues)
    }

    function HandleChangeStrings(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });


        if (!/^([A-Za-z]){3,20}$/.test(formValues[e.target.name])) {
            setError({...error, nameError: 'Solo puedes introducir entre 3 y 20 letras'})
        } else  {
            setError({...error, nameError: ''})
        }
    }

    function HandleChangeNumbers (e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
        if(!/^[0-9]{0,1}$/.test(formValues[e.target.name])) {
            setError({...error, [`${e.target.name}Error`]: 'Solo puedes introducir numeros entre 1 y 100'})
        } else {
            setError({...error,  [`${e.target.name}Error`]: ''})
        }
    }

    function handleChange (e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit (e) {
        e.preventDefault();
        if([formValues.name, formValues.min_life_span, formValues.max_life_span, formValues.min_weight,
            formValues.max_weight, formValues.min_height, formValues.max_height].includes('') || 
            formValues.temperament.length <= 0) {
                return alert('debes completar todos los campos marcados con asterisco')
            } else {

            let dog = {
            name: formValues.name,
            height: `${formValues.min_height} - ${formValues.max_height}`,
            weight: `${formValues.min_weight} - ${formValues.max_weight}`,
            life_span: `${formValues.min_life_span} - ${formValues.max_life_span}`,
            image: formValues.image || logo,
            temperament: formValues.temperament,
        }
        postMyDogs(dog);
        alert(`Felicitaciones, has creado a ${formValues.name}!!!!!`)
        setFormValues({
            name: '',
            min_life_span: '',
            max_life_span: '',
            min_weight: '',
            max_weight: '',
            min_height: '',
            max_height: '',
            image: '',
            temperament: []
        })
    }}

    return (
    <div className='create-dog-container'>
    <div className='form-container'>
        <br/>
        <br/>
        <h1>Crea tu propio perro!</h1>
        <h3>Debes completar todos los campos marcados con asterisco*</h3>
        <form onSubmit={e => handleSubmit(e)} className='form'>
            <input className={error.nameError && 'danger'} key = 'name' name ='name' type='text' placeholder='Nombre*' value={formValues.name || ''} onChange={e => HandleChangeStrings(e)}/>
            {!error.nameError? null : <span>{error.nameError}</span>}
            <br/>
            <br/>
            <input className={error.min_life_spanError && 'danger'} key='min_life_span'  name ='min_life_span' type='number' placeholder='Años de vida minimos*' value={formValues.min_life_span || ''} onChange={e => HandleChangeNumbers(e)}/>
            {!error.min_life_spanError? null : <span>{error.min_life_spanError}</span>}
            <br/>
            <br/>
            <input className={error.max_life_spanError && 'danger'} key='max_life_span'  name ='max_life_span' type='number' placeholder='Años de vida maximos*' value={formValues.max_life_span || ''} onChange={e => HandleChangeNumbers(e)}/>
            {!error.max_life_spanError? null : <span>{error.max_life_spanError}</span>}
            <br/>
            <br/>
            <input className={error.min_weightError && 'danger'} key='min_weight' name ='min_weight' type='number' placeholder='Peso minimo*' value={formValues.min_weight || ''} onChange={e => HandleChangeNumbers(e)}/>
            {!error.min_weightError? null : <span>{error.min_weightError}</span>}
            <br/>
            <br/>
            <input className={error.max_weightError && 'danger'} key='max_weight' name ='max_weight' type='number' placeholder='Peso maximo*' value={formValues.max_weight || ''} onChange={e => HandleChangeNumbers(e)}/>
            {!error.max_weightError? null : <span>{error.max_weightError}</span>}
            <br/>
            <br/>
            <input className={error.min_weightError && 'danger'} key='min_height' name ='min_height' type='number' placeholder='Altura minima*' value={formValues.min_height || ''} onChange={e => HandleChangeNumbers(e)}/>
            {!error.min_heightError? null : <span>{error.min_heightError}</span>}
            <br/>
            <br/>
            <input className={error.max_weightError && 'danger'} key='max_height' name ='max_height' type='number' placeholder='Altura maxima*' value={formValues.max_height || ''} onChange={e => HandleChangeNumbers(e)}/>
            {!error.max_heightError? null : <span>{error.max_heightError}</span>}
            <br/>
            <br/>
            <input key='image' name ='image' type='url' value={formValues.image}  alt='selecciona-una-imagen' placeholder='Imagen: Ingresa una URL' onChange={e => handleChange(e)}/>
            <br/>
            <br/>
            <button name='button' type='submit'>Enviar</button>
        </form>
    </div>
    <div className='search-temps-container'>
        <div className='wrapper'>
        <div className='search-input'>
            <input
            key='input-search-temps'
            type='text'
            placeholder=' Introduce un temperamento*'
            onChange={(e)=> setQuery(e.target.value)}
            value={query}
            />
            <div className='autocom-box'>
                {query && searchedTemps.map(t => {
                    return( 
                        <div key={t} className='logo-dog' onClick={(e) => handleClick(t,e)}>
                            <li>{t}</li>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
        <h2>Los temperamentos seleccionados son:</h2>
        {formValues.temperament && formValues.temperament.map (t => {
            return (
                <div key={t}>
                    <li>{t}</li>
                </div>
        )})}
    </div>
    </div>
)}

let mapStateToProps = (state) => {
    return {
        searchedTemps: state.searchedTemps
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchTemps: (temp) => dispatch(searchTemps(temp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateDog);