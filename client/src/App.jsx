import { useState, useEffect } from 'react';
import Task from "./Components/Task";
import abi from "./contractJson/TaskContract.json"
import { ethers } from 'ethers';
import Login from "./Components/Login";
//0x5FbDB2315678afecb367f032d93F642f64180aa3
function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  },[provider]);

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function conncetToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected: " + address);
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
          <Task account={account} />
        ) : (
          <Login connectWallet={conncetToMetamask} />
        )}
      </div>
  )
}

export default App
