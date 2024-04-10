import { useEffect, useState,useCallback } from 'react'
import './Petition.css'



export default function Petition({votedapp, signer}) {
    const [petitions, setPetitions] = useState([])

    const writePetition = useCallback(async (index) => {
        try{
            const transaction = await votedapp.connect(signer).writePet(index);
            await transaction.wait();
        }
        catch(e) {
            alert('Вы уже подписали эту петицию')
        }
    })

    const viewContractAssets = useCallback(async () => {
        const newPetitions = [];
        const _petitionsMasLength = await votedapp.connect(signer).petitionsMasLength()
        for (let i = 0; i < Number(_petitionsMasLength); i++) {
          const petition = await votedapp.connect(signer).petitionsMas(i);
          newPetitions.push(petition);
        }
        setPetitions(newPetitions);
      }, [signer]);

      useEffect(() => {
        viewContractAssets();
      },[viewContractAssets])

    return(<>
    {petitions.length == 0 && (<><h2>В данный момент нет петиций</h2></>)}
    <div className="pets" >
        {petitions.map((petition) => (<>
        
    <div className='VoteContainer' key={petition.id}>
        <div id='naddo'>

    <h2 className='nameVote'>{petition.name}</h2>
    <h2>Описание:</h2>
    <h3 className='descriptionVote'>{petition.description}</h3>
        </div>
    <button  className='PetBut' onClick={() => {writePetition(petition.id)}}>Подписать</button>
    <h2 id='candidatsH2'>Подписали: {petition.votes.toString()} </h2>
    </div>
        </>))}

    </div>
    </>)
}