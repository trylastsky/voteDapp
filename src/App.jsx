import { useEffect, useState } from 'react';
import { ethers } from 'ethers';


//import modules
import Header from './modules/Header/Header';
import PrivateCabinet from './modules/PrivateCabinet/PrivateCabinet';
import Votes from './modules/VoteModule/Vote/Votes';
import Petitions from './modules/VoteModule/Petition/Petitions';
import Alert from './modules/Alert/Alert';
import Registration from './modules/Registration/Registration';

//import assets
import userAvatarDefault from "./assets/testAvatar.png";

//import contract particles
import voteDapp from "./artifacts/contracts/VoteDapp.sol/VoteDapp.json"; //импорт abi
import contractAddress from '../contractAddress.json'; //импорт voteDapp.target
import './App.css';

let votedapp = null; //начальная переменная для контракта

export default function App() {
  //user useStates
  const [userAvatar, setUserAvatar] = useState(userAvatarDefault);


  //ethers useStates
  const [provider, setProvider] = useState(null); //chain provider
  const [signer, setSigner] = useState(null); //active signer
  const [chain, setChain] = useState(null); //active chain
  //states for modules
  const [voteStatus, setVoteStatus] = useState(true); // toggle pop to votes page 
  const [menuStatus, setMenuStatus] = useState(false); // toggle pop to menu buttons
  const [privateCabStatus, setPrivateCabStatus] = useState(false);
  //states for backend
  const [regStatus, setRegStatus] = useState(null); //signer registration status state


 
  useEffect(() => {
		const useContract = async () => { // create contract object
			try {
        votedapp = new ethers.Contract( //creating a contract instance
          contractAddress, voteDapp.abi, provider)
			  } catch(e) {
				alert(e)
			}
		  }
      window.ethereum.on('accountsChanged', () => {window.location.reload()})
		useContract()
	}, [signer,provider])



  return (
    <>
     <Header
     votedapp={votedapp}
     signer={signer}
     setSigner={setSigner}
     chain={chain}
     setChain={setChain}
     provider={provider}
     setProvider={setProvider}
     menuStatus={menuStatus}
     setMenuStatus={setMenuStatus}
     privateCabStatus={privateCabStatus}
     setPrivateCabStatus={setPrivateCabStatus}
     userAvatar={userAvatar}
     setUserAvatar={setUserAvatar}
     regStatus={regStatus}
     setRegStatus={setRegStatus} 
    />
{signer ? (<>
    {regStatus ? (<>
    
      
        {privateCabStatus ? (<><PrivateCabinet
      votedapp={votedapp}
      signer={signer}
      userAvatar={userAvatar}
      setUserAvatar={setUserAvatar}/></>) : (<>
      
          {voteStatus == true ? (<>
            <button className='changeBut' onClick={() => {setVoteStatus(false)}}>Перейти к Петициям</button>
          </>) : (<>
            <button className='changeBut' onClick={() => {setVoteStatus(true)}}>Перейти к Голосованиям</button>
          </>)}
        <div className='VotePage'>
          {voteStatus && (<>
            <Votes votedapp={votedapp} signer={signer}></Votes>
          </>)}
          {!voteStatus && (<> 
          <Petitions votedapp={votedapp} signer={signer}></Petitions>
          </>)}
        </div>
      </>)}
    </>) : (<>
    <Registration votedapp={votedapp} signer={signer}/>
   </>)}
      </>) 
    : (<>
      <Alert/>
      </>)}
      
      
    </>
  )
}

