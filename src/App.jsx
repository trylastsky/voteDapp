import { useState } from 'react'
import { useEffect } from 'react'
import { ethers } from 'ethers'


//import modules
import Header from './modules/Header/Header'
import PrivateCabinet from './modules/PrivateCabinet/PrivateCabinet'
import Votes from './modules/VoteModule/Vote/Votes'
import Petitions from './modules/VoteModule/Petition/Petitions'

//import assets
import userAvatarDefault from "./assets/testAvatar.png";


import voteDapp from "./artifacts/contracts/VoteDapp.sol/VoteDapp.json" //импорт abi
import contractAddress from '../contractAddress.json'; //импорт voteDapp.target
import './App.css'

let votedapp = null; //начальная переменная для контракта

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
  const [regStatus, setRegStatus] = useState(true);
  //states for menu modules
  const [privateCabStatus, setPrivateCabStatus] = useState(false);


 
  useEffect(() => {
		const useContract = async () => {
			try {
        votedapp = new ethers.Contract( //создание экземплера контракта
          contractAddress, voteDapp.abi, provider)
			  } catch(e) {
				alert(e)
			}
		  }
		useContract()
	}, [signer,provider])
  
  window.ethereum.on('accountsChanged', () => {window.location.reload()})

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
    <h1>
    Пожалуйста зарегистрируйтесь
    </h1>
   </>)}
      </>) 
    : (<>
      <div className='Alert'>

      <h2>Пожалуйста войдите в MetaMask</h2>
      <h2>Please sig in MetaMask</h2>
      <h3>Данная платформа поддерживается только в MetaMask</h3>
      <h3>These actions occur only after entering the MetaMask.</h3>
      </div>
      </>)}
      
      
    </>
  )
}

