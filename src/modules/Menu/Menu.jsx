import "./Menu.css";
import { ethers } from "ethers";

export default function Menu({
	setSigner,
	setProvider,
	privateCabStatus,
	setMenuStatus,
	setPrivateCabStatus,
	regStatus
}) {
	return (
		<>
			<button
				className="ButtonMenuModules"
				onClick={() => {
					setPrivateCabStatus(false);
					// setRegStatus(false);
					setMenuStatus(false)
				}}
			>
				На Главную
			</button>
			{privateCabStatus && (
				<>
					<div className="exitContainer">
						<button className="ButtonMenuExit" onClick={() => {
							setSigner(null)
							setProvider(null)
							window.location.reload()
						}}>Выход из Аккаунта</button>
					</div>
				</>
			)}

			{!regStatus && (<>
			<div className="exitContainer">
				<button className="ButtonMenuExit" onClick={() => {
					window.location.reload()
				}}> Отмена</button>
			</div>
			</>)}
		</>
	);
}
