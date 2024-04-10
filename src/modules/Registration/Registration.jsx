import { useState, useCallback } from 'react';
import './Registration.css';

export default function Registration({votedapp,signer}) {
    const [userName, setUserName] = useState(null);
    const [userDescription, setUserDescription] = useState('');

    const regFun = useCallback(async () => {
        try {
            const transaction = await votedapp.connect(signer).reg(userName, userDescription);
            await transaction.wait();
            window.location.reload()
        }
        catch(e) {
            console.log(e);
            alert(e)
            onclick(window.location.reload())
        }
    })

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
    <button className='RegButton' onClick={() => {
        if(!userName) {
            alert('введите имя')
            return
        }
        else if(!userDescription) {
            alert("Введите описание, в дальнейшем изменение описания будет стоить газа!!")
            onclick(regFun());
        }
        else if (userName && userDescription) {
            const confirmed = confirm('Вы уверены что хотите зарегистрироватся?')
            if (confirmed) regFun();
            else window.location.reload();
            
        } 
    }}>Продолжить</button>
    </div>
    </>)
}