import { useState } from 'react'
import { useEffect } from 'react'
import { ethers } from 'ethers'


//import modules
import Header from './modules/Header/Header'
import PrivateCabinet from './modules/PrivateCabinet/PrivateCabinet'
import Vote from './modules/VoteModule/Vote/Vote'
import Petition from './modules/VoteModule/Petition/Petition'

//import assets
import userAvatarDefault from "./assets/testAvatar.png";


import voteDapp from "./artifacts/contracts/VoteDapp.sol/VoteDapp.json" //импорт abi
import contractAddress from '../contractAddress.json'; //импорт voteDapp.target
import './App.css'

let votes = [];
const petitions = [];

export default function App() {
  //user useStates
  const [userAvatar, setUserAvatar] = useState(userAvatarDefault);


  //ethers useStates
  const [provider, setProvider] = useState(null) //провайдер сети
  const [signer, setSigner] = useState(null); //активная учетка
  const [signers, setSigners] = useState([]); //все учетки пользователя
  const [chain, setChain] = useState(null); //активная сеть
  //states for modules
  const [voteStatus, setVoteStatus] = useState(true);
  const [menuStatus, setMenuStatus] = useState(false)
  const [regStatus, setRegStatus] = useState(false);
  //states for menu modules
  const [privateCabStatus, setPrivateCabStatus] = useState(false);

  let votedapp = null; //начальная переменная для контракта
 
  useEffect(() => {
		const useContract = async () => {
			try {
        votedapp = new ethers.Contract( //создание экземплера контракта
          contractAddress, voteDapp.abi, provider)
          console.log(votedapp)
			  } catch(e) {
				alert('Contract states not true')
				console.log(e)
			}
		  }
    
    const assetsContract = async () => { //функция тянет начальные массивы и прочее в app.jsx
     
    }

		useContract()
    assetsContract()
	}, [])
  

  return (
    <>
     <Header
     votedapp={votedapp}
     signer={signer}
     setSigner={setSigner}
     signers={signers}
     setSigners={setSigners}
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
    //  regStatus={regStatus}
    //  setRegStatus={setRegStatus} 
    />

      {/* {regStatus ? <Registration votedapp={votedapp} signer={signer}/> : (<> */}
      
      {privateCabStatus ? (<><PrivateCabinet
      signer={signer}
      userAvatar={userAvatar}
      setUserAvatar={setUserAvatar}/></>) : (<>
      
          {voteStatus ? (<>
            <button onClick={() => {setVoteStatus(false)}}>Перейти к Петициям</button>
          </>) : (<>
            <button onClick={() => {setVoteStatus(true)}}>Перейти к Голосованиям</button>
          </>)}
        <div className='VotePage'>
          {voteStatus && (<>
            <Vote></Vote>
          </>)}
          {!voteStatus && (<> 
          <Petition></Petition>
          </>)}
        </div>
      </>)}
      </>)}
      // </>
//   )
// }

