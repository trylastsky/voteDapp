import { useEffect,useCallback,useState } from 'react';
import Candidate from './Candidate/Candidate';
import constructor from "../../../../scripts/constructor.json"

import './Vote.css';

export default function Vote({votedapp, signer}) {

    const [votes, setVotes] = useState([]);

    const viewContractAssets = useCallback(async () => {
      const newVotes = [];
      for (let i = 0; i < constructor.votes.length; i++) {
        const vote = await votedapp.connect(signer).votesMas(i);
        newVotes.push(vote);
      }
      setVotes(newVotes);
    }, [signer]);
    
    useEffect(() => {
      viewContractAssets();
    }, [viewContractAssets]);
    
    window.ethereum.on('accountsChanged', () => {
			window.location.reload();
		})
    
    return(<>
    <div className='votes' key={'allVotes'}>

    {votes.map((vote) => (<>
    
    <div className='VoteContainer' key={vote.id}>
        <div id='naddo'>

    <h2 className='nameVote'>{vote.name} </h2>
    <h2>Описание:
    </h2>
    <h3 className='descriptionVote'>{vote.description}</h3>
        </div>
    <h2 id='candidatsH2'>Кандидаты</h2>
    <p>id:{vote.id.toString()}</p>

    </div>
    </>))}

    </div>
    </>)
}