import {useState, useEffect} from 'react';
import abi from "./contractJson/ToDoList.json";
import { ethers } from 'ethers';
import Login from "./Components/Login";
import Connected from "./Components/Connected";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] =  useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [state, setState] = useState(null);

  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  },[provider]);

  function handleAccountsChanged(accounts){
    if(accounts.length > 0 && account !== account[0]){
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectedToMetamask() {
    if(window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connect: " + address);
        setIsConnected(true);
      } catch (error) {
        alert(error);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }


  return (
    <div>
      {isConnected ? (
      <Connected account={account}/>
      ) : (
      <Login connectWallet={connectedToMetamask} />
      )}
    </div>
  )
}

export default App

//0x5FbDB2315678afecb367f032d93F642f64180aa3