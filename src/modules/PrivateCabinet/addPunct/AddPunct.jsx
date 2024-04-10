import { useState } from 'react'
import './AddPunct.css'

export default function AddPunct({votedapp, signer,voteType, setTogglePop}) {
    
    const [nameVote, setNameVote] = useState();
    const [descriptionVote, setDecriptionVote] = useState();

    const nameEvent = (event) => {
        if(event.target.value.length > 15){
            alert('Вы превысили число допустимых символов') 
            event.target.value = null}
        else setNameVote(event.target.value);
    }

    const descriptionE = (e) => {
        if(e.target.value.length > 80) {
            alert('Вы превысили число допустимых символов');
            e.target.value
        }
        setDecriptionVote(e.target.value);
    }


    return(<>
    {voteType ? (<>
        <div className="boxInput">
        <h3>Имя Голосования</h3>
        <input className='Input' type="text" placeholder="Введите имя Голосования" onInput={nameEvent}/>
        <h3>Описание голосования</h3>
        <input className='Input' type="text" placeholder="Описание Голосования" onInput={descriptionE}/>
        <div className='infoPack'>
        <p>{descriptionVote}</p>

        </div>
        <button className='niceBut' onClick={async () => {
            if(nameVote && descriptionVote) {
                const ts = await votedapp.connect(signer).addVote(nameVote, descriptionVote, 60, 3600) // последние два аргумента это тесты , 
                await ts.wait();
                setTogglePop(false);
                //по сути дела 3 аргумент это колво минут за которое может присоединится пользователь
                //а 4 аргумент должен отвечать за время , через которое голосовать уже будет нельзя = автотест результатов и прочее
            }
            else {
                if(!nameVote) alert('Пожалуйста введите имя')
                else if(!descriptionVote) alert('Пожалуйста введите описание')
            }
        }}>Опубликовать</button>
    </div>
    </>) : (<>
        <div className="boxInput">
        <h3>Имя Петиции</h3>
        <input className='input' type="text" onInput={nameEvent} placeholder="Введите имя Петиции"/>
        <h3>Описание Петиции</h3>
        <input className='input' type="text" placeholder="Описание Петиции" onInput={descriptionE}/>
        <button className='niceBut' onClick={async() => {
            if(nameVote && descriptionVote){
               const ts = await votedapp.connect(signer).addPet(nameVote, descriptionVote, 3600);
               await ts.wait();
               setTogglePop(false);
            }
            else if(!nameVote) alert('Пожалуйста введите имя')
            else if (!descriptionVote) alert('Пожалуйста введите описание')
           
        }} >Опубликовать</button>
    </div>
    </>)}
    
    </>)
}