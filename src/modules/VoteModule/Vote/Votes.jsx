import { useEffect,useCallback,useState } from 'react';
import Candidate from './Candidate/Candidate';

import './Vote.css';

export default function Vote({votedapp, signer}) {

    const [votes, setVotes] = useState([]);
    const [statusJoinButton, setStatusJoinButton] = useState(null);


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
    {votes.length == 0 && (<><h2>В данный момент нет голосований</h2></>)}
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
    <div className='Candidats'>
      <Candidate votedapp={votedapp}
      signer={signer}
      voteId={vote.id} 
      statusJoinButton={statusJoinButton}
      setStatusJoinButton={setStatusJoinButton}
  
      key={'vote' + vote.id + 'Candidats'}/>
    </div>
    {statusJoinButton && (<>
      <button id='setCandidate' onClick={async () => {
        try {
          const ts = await votedapp.connect(signer).addCandidate(vote.id)
        }
        catch(e) {
          console.log(e)
          alert(e)
        }
      }}>Стать Кандидатом</button>
    </>)}
    
    </div>
    </>))}

    </div>
    </>)
}