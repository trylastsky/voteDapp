import { useEffect, useState,useCallback } from 'react'
import { ethers } from 'ethers'
import constructor from '../../../../scripts/constructor.json'
import './Petition.css'


export default function Petition({votedapp, signer}) {
    const [petitions, setPetitions] = useState([])

    const viewContractAssets = useCallback(async () => {
        const newPetitions = [];
        for (let i = 0; i < constructor.petitions.length; i++) {
          const petition = await votedapp.connect(signer).petitionsMas(i);
          newPetitions.push(petition);
        }
        setPetitions(newPetitions);
      }, [signer]);

      useEffect(() => {
        viewContractAssets();
      },[viewContractAssets])
console.log(petitions)

    return(<>
    <div className="pets" >
        {petitions.map((petition) => (<>
        
    <div className='VoteContainer' key={petition.id}>
        <div id='naddo'>

    <h2 className='nameVote'>{petition.name}</h2>
    <h2>Описание:</h2>
    <h3 className='descriptionVote'>{petition.description}</h3>
        </div>
    <h2 id='candidatsH2'>Подписали: {petition.votes.toString()} </h2>
    <button  className='PetBut'>Подписать</button>
            <p>id:{petition.id.toString()}</p>
    </div>
        </>))}

    </div>
    </>)
}