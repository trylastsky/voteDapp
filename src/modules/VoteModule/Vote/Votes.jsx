import { useEffect,useCallback,useState } from 'react';
import Candidate from './Candidate/Candidate';

import './Vote.css';

export default function Vote({votedapp, signer}) {

    const [votes, setVotes] = useState([]);

    const viewContractAssets = useCallback(async () => {
      const newVotes = [];
      const _votesMasLength = await votedapp.connect(signer).votesMasLength();
      for (let i = 0; i < Number(_votesMasLength); i++) {
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

    <h3 className='nameVote'>{vote.name} </h3>
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