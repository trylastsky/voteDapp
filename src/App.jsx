import { useState } from 'react'
import { ethers } from 'ethers'

//import modules
import Header from './modules/Header/Header'
import VotePage from './modules/VotePage'
import PrivateCabinet from './modules/PrivateCabinet/PrivateCabinet'

//import assets
import userAvatarDefault from "./assets/testAvatar.png";

import './App.css'

function App() {
  //user useStates
  const [userAvatar, setUserAvatar] = useState(userAvatarDefault);


  //ethers useStates
  const [provider, setProvider] = useState(null) //провайдер сети
  const [signer, setSigner] = useState(null) //пользователь который отправляет запросы
  //states for modules
  const [menuStatus, setMenuStatus] = useState(false)
  //states for menu modules
  const [privateCabStatus, setPrivateCabStatus] = useState(false);

  
  const onConnect = async () => {
    if(window.ethereum) {
      setProvider(await ethers.BrowserProvider(window.ethereum))
    }
  }

  return (
    <>
     <Header
     menuStatus={menuStatus}
     setMenuStatus={setMenuStatus}
     privateCabStatus={privateCabStatus}
     setPrivateCabStatus={setPrivateCabStatus}
     userAvatar={userAvatar}
     setUserAvatar={setUserAvatar}/>

      {privateCabStatus ? (<><PrivateCabinet
      userAvatar={userAvatar}
      setUserAvatar={setUserAvatar}/></>) : (<><VotePage/></>)}


      </>
  )
}

export default App
