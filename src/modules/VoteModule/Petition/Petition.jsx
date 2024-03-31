import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './Petition.css'

export default function Petition({signer, votedapp}) {
    const [votes, setVotes] = useState(0)

    // useEffect(() => {
    //     const states = async () => {
    //         const votes = await votedapp.petVotesTest()
    //         console.log(petVotesTest)
    //         setVotes(votes)
    //     }
    //     states()
    // }, [])

    return(<>
    <div className='VoteContainer'>
        <div id='naddo'>

    <h2 className='nameVote'>Признание Котиков Лучшими</h2>
    <h2>Описание:</h2>
    <h3 className='descriptionVote'>Котики вошли в нашу жизнь как самые милые питомцы,подпишите эту петицию если вы считаете так же</h3>
        </div>
    <h2 id='candidatsH2'>Подписали: {votes} </h2>
    <button  className='PetBut' onClick={async () => {
        if (signer == null) alert('пожалуйста зайдите в метамаск')
        else {
            // const statusWriteTransaction = await votedapp.watchTestPartMap();
            // const statusWrite = await statusWriteTransaction.wait()
            // if (statusWrite == true) alert ("Вы уже подписали эту петицию");
            // else {
                const transaction = await votedapp.connect(signer).writePetTest();
                await transaction.wait()
                setVotes(votes + 1)
            // }
    }
        console.log(signer)
        console.log(votedapp)
    }}>Подписать</button>

    </div>
    </>)
}