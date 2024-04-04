import { useEffect, useState,useCallback } from 'react'
import { ethers } from 'ethers'
import './Petition.css'


export default function Petition({votedapp, signer}) {
    const [petitions, setPetitions] = useState([])

    const viewContractAssets = useCallback(async () => {
        const newPetitions = [];
        const _petitionsMasLength = await votedapp.connect(signer).petitionsMasLength()
        console.log(Number(_petitionsMasLength))
        for (let i = 0; i < Number(_petitionsMasLength); i++) {
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
    <button  className='PetBut'>Подписать</button>
    <h2 id='candidatsH2'>Подписали: {petition.votes.toString()} </h2>
            <p>id:{petition.id.toString()}</p>
    </div>
        </>))}

    </div>
    </>)
}