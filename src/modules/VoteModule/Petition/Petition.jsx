import { useState } from 'react'
import './Petition.css'

export default function Petition() {
    const [votes, setVotes] = useState(0)

    return(<>
    <div className='VoteContainer'>
        <div id='naddo'>

    <h2 className='nameVote'>Имя Петиции</h2>
    <h2>Описание:</h2>
    <h3 className='descriptionVote'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error quis nulla reiciendis incidunt deserunt atque quaerat, quod id optio aliquid labore, explicabo provident rem dolor quo? Nihil quod molestiae tempora.</h3>
        </div>
    <h2 id='candidatsH2'>Подписали: {votes} </h2>
    <button className='PetBut' onClick={() => {
        setVotes(votes+1)
    }}>Подписать</button>

    </div>
    </>)
}