import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './Petition.css'


export default function Petition({signer, votedapp}) {
    const [votes, setVotes] = useState(0)

    useEffect(() => {
        const fetchVotes = async () => {
          try {
            const votes = await votedapp.testPartMap(signer)
            console.log(votes)
            setVotes(votes)
          } catch (error) {
            console.error(error)
          }
        }
        fetchVotes();
      }, [])

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
            // return {watchTestPartMap: statusWriteTransaction}
            // console.log(statusWriteTransaction);
            // const statusWrite = await statusWriteTransaction.wait()
            // if (statusWrite == true) alert ("Вы уже подписали эту петицию");
            // else {
                try {
                    const transaction = await votedapp.signer(signer).writePetTest()
                    await transaction.wait()
                    setVotes(votes + 1)
                }
                catch(e) {
                    alert(e)
                }
            // }
    }
        console.log(signer)
        console.log(votedapp)
    }}>Подписать</button>

    </div>
    </>)
}