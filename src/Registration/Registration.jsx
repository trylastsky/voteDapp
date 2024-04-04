import { useState, useCallback } from 'react';
import './Registration.css';

export default function Registration() {
    const [userName, setUserName] = useState(null);
    const [userDescription, setUserDescription] = useState(null);

    const stateName = (event) => {
        setUserName(event.target.value);
    }

    const stateDescription = (event) => {
        setUserDescription(event.target.value)
    }

    return(<>
    <div className='inputContainer'>
    <h1>Пожалуйста зарегистрируйтесь</h1>
    <input type="text" className='Input' onInput={stateName} placeholder='Имя' />
    <input type="text" className='Input' onInput={stateDescription} placeholder='Описание' />
    {userDescription && (<> <h3>Описание</h3> <p>{userDescription}</p></>)}
    <button className='RegButton'>Продолжить</button>
    </div>
    </>)
}