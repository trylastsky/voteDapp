import { useEffect, useState, useCallback } from 'react'
import testAvatar from '../../../../assets/testAvatarDef.png'

import './Candidate.css'

export default function Candidate({votedapp,
    signer,
    voteId,
    statusJoinButton,
    setStatusJoinButton}) {

    const [candidats, setCandidats] = useState([]);

    const checkCandidats = useCallback(async (idVote) => {
        const newCandidats = [];
        const lengthCandidats = await votedapp.connect(signer).checkLengthCandidats(idVote);
        for(let i = 0; i < Number(lengthCandidats); i++) {
          const checkCandidats = await votedapp.connect(signer).candidatsMap(idVote,i);
          newCandidats.push(checkCandidats);
        }
        setCandidats(newCandidats);
      })

      const checkJoinStatus = useCallback(async (voteId) => {
        const ts = await votedapp.connect(signer).checkTimeToJoin(voteId)
        const statusCandidate = await votedapp.connect(signer).candidateStatusMap(signer);
        if (statusCandidate) {
            setStatusJoinButton(false);

        } else {
            setStatusJoinButton(ts)
            console.log(ts)
        }
      })

    useEffect(() => {
            checkCandidats(voteId);
            checkJoinStatus(voteId);
    },[voteId]);

    return(<>
    {candidats.map((candidate) => (<>
    
    <div className="CandidateContainer" key={'candidate' + candidate.id}>
        <div id='Nado'>
    <img className="ave" src={testAvatar} alt="аватар" /> 
    <div>
    <h2>{candidate.user.name}</h2> 
        </div>  
        <button className='ButtonVote' key={'butToVote' + candidate.id} onClick={async () => {
            try {
                const transaction = await votedapp.connect(signer).changeCandidate(voteId, candidate.id);
            }
            catch(e) {
                alert('Вы уже проголосовали');
            }
        }}>Проголосовать</button>
        </div>
    <h2>Описание</h2>
    <h3>{candidate.user.description}</h3>
    <h4>Проголосовали: {Number(candidate.votes)}</h4>
    </div>
    </>))}
    </>)
}