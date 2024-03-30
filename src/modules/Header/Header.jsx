import { ethers } from "ethers";
import Menu from "../Menu/Menu";
import "./Header.css";




export default function Header({
	votedapp,
	signer, //ёлочка votedApp:)
	setSigner,
	setProvider,
	menuStatus,
	setMenuStatus,
	privateCabStatus,
	setPrivateCabStatus,
	userAvatar,
	setUserAvatar,
	// regStatus,
	// setRegStatus
}) {


	const onConnect = async () => {
		if(window.ethereum) { //проверяем есть ли метамаск
		  console.log('metamask defined')
		  const provider = new ethers.BrowserProvider(window.ethereum);
		  setProvider(provider);
		  await window.ethereum.request({ method: 'eth_requestAccounts' });
		  let signer = provider.getSigner();
		  setSigner(signer)
		}
		else {
			console.log('metamask not defined')
			alert('Please Install Metamask')
			onclick(window.location.reload())
			let provider = ethers.getDefaultProvider()
			setProvider(provider);
		}
	  }


	  
	
	return (
		<>
			<div className="Header">
				<button
					className="LogoBut"
					onClick={() => {
						setPrivateCabStatus(false);
						// setRegStatus(false);
						setMenuStatus(false);
					}}
				>
					<h1 className="Logo">VoteDapp</h1>
				</button>
				{/* // изображение аватара пользователя */}
				<div className="caseUserAvatar">
				{signer ? (<>
				
					{!privateCabStatus && (
						<>
							<button
								className="butUserAvatar"
								onClick={() => {
									setPrivateCabStatus(true);
									setMenuStatus(false)
								}}
							>
								<img
									className="UserAvatar"
									src={userAvatar}
									alt="ваш аватар"
								/>
							</button>
						</>
					)}
				</>) : (<>
				{/* {regStatus == false && <> */}
				<button id="auth" className="regBut" onClick={onConnect}>Вход</button>
				{/* <button id="reg" className="regBut" onClick={() => {
					// setRegStatus(true)
					setMenuStatus(false)
				}}>Регистрация</button> */}
				
				{/* </>} */}
				</>)}
				

					{/* кнопка меню */}
					<button
						className="ButtonMenu"
						onClick={() => {
							if (menuStatus == false) setMenuStatus(true);
							else setMenuStatus(false);
						}}
					>
						<img
							className="Menu"
							src="src/assets/menu.png"
							alt="menu"
						/>
					</button>
				</div>

				{menuStatus && (
					<>
						<Menu
							setSigner={setSigner}
							setProvider={setProvider}
							privateCabStatus={privateCabStatus}
							setMenuStatus={setMenuStatus}
							setPrivateCabStatus={setPrivateCabStatus}
							// setRegStatus={setRegStatus}
						/>
					</>
				)}
			</div>
		</>
	);
}

