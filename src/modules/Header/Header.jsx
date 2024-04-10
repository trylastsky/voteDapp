import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
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
	regStatus,
	setRegStatus
}) {


	useEffect(() => {
		if(signer) {
			const stateRegStatus = async () => {
				const _regStatus = await votedapp.connect(signer).regStatus(signer);
				setRegStatus(_regStatus)
			}
			stateRegStatus();
		}
		window.ethereum.on('accountsChanged',onConnect);
	},[signer])

	const onConnect = useCallback(async () => {
		if(window.ethereum) { //проверяем есть ли метамаск
			const provider = new ethers.BrowserProvider(window.ethereum);
			const newSigner = await provider.getSigner()
			setProvider(provider);
			setSigner(newSigner);
		}
		else {
			alert('Please Install Metamask')
			onclick(window.location.reload())
			let provider = ethers.getDefaultProvider()
			setProvider(provider);
			setSigner(null);
		}

	  }
	)

	  
	
	return (
		<>
			<div className="Header">
				<button
					className="LogoBut"
					onClick={() => {
						setPrivateCabStatus(false);
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
						{regStatus && (<>
						
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
						</>)}
				</>) : (<>

				<button id="auth" className="regBut" onClick={onConnect}>Вход</button>
		
				
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
							regStatus={regStatus}
						/>
					</>
				)}
			</div>
		</>
	);
}

