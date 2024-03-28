npx hardhat clean
gnome-terminal -- npx hardhat node
sleep 2
npx hardhat run scripts/deploy.js --network localhost
open http://localhost:5173/
npm run dev