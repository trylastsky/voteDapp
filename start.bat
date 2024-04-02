call npm i
call npx hardhat clean
start "Hardhat Node" %SystemRoot%\system32\cmd.exe /c "start /B npx hardhat node"
call npx hardhat run scripts/deploy.cjs --network localhost
start http://localhost:5173/
call npm run dev
