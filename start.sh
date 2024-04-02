npm i
npx hardhat clean
gnome-terminal -- npx hardhat node
sleep 5
npx hardhat run scripts/deploy.cjs --network localhost
open http://localhost:5173/
npm run dev