import "./Menu.css";

export default function Menu({ privateCabStatus, setPrivateCabStatus }) {
	return (
		<>
			<div className="MenuModules"></div>
			<button
				className="ButtonMenuModules"
				onClick={() => {
					setPrivateCabStatus(false);
				}}
			>
				На Главную
			</button>
			{privateCabStatus && (
				<>
					<div className="exitContainer">
						<button className="ButtonMenuExit">Выход из Аккаунта</button>
					</div>
				</>
			)}
		</>
	);
}
