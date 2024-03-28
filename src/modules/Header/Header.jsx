import Menu from "../Menu/Menu";
import "./Header.css";

export default function Header({
	menuStatus,
	setMenuStatus,
	privateCabStatus,
	setPrivateCabStatus,
	userAvatar,
	setUserAvatar,
}) {
	return (
		<>
			<div className="Header">
				<button
					className="LogoBut"
					onClick={() => {
						setPrivateCabStatus(false);
					}}
				>
					<h1 className="Logo">VoteDapp</h1>
				</button>
				{/* // изображение аватара пользователя */}
				<div className="caseUserAvatar">
					{!privateCabStatus && (
						<>
							<button
								className="butUserAvatar"
								onClick={() => {
									setPrivateCabStatus(true);
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
							privateCabStatus={privateCabStatus}
							setPrivateCabStatus={setPrivateCabStatus}
						/>
					</>
				)}
			</div>
		</>
	);
}
