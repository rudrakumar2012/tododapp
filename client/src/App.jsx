import { useState, useEffect } from 'react';
import Task from "./Components/Task";
import abi from "./contractJson/TaskContract.json"
import { ethers } from 'ethers';
import Login from "./Components/Login";

function App() {
const TaskContractAddress = "0xA4e24cD3Db9b79993764B5733718Ce25e91254AC";
const TaskAbi = abi.abi;
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState('');
const [provider, setProvider] = useState(null);
const [account, setAccount] = useState(null);
const [isConnected, setIsConnected] = useState(false);

useEffect(() => {
  const storedConnectionStatus = localStorage.getItem('isConnected');
  const lastConnectedAccount = localStorage.getItem('connectedAccount');
  if (storedConnectionStatus === 'true' && lastConnectedAccount) {
    setIsConnected(true);
    setAccount(lastConnectedAccount);
    getAllTasks();
  }
}, []);

useEffect(() => {
  localStorage.setItem('isConnected', JSON.stringify(isConnected));
}, [isConnected]);

useEffect(() => {
  if (isConnected) {
    getAllTasks();
  }
}, [isConnected]);

useEffect(() => {
  if (provider) {
    provider.on("accountsChanged", handleAccountsChanged);
    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
    };
  }
}, [provider]);

function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
}

const getAllTasks = async () => {
    if (!window.ethereum || !isConnected) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const TaskContract = new ethers.Contract(TaskContractAddress, TaskAbi, signer);
    let allTasks = await TaskContract.getMyTasks();
    setTasks(allTasks);
}

async function connectToMetamask() {
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

const addTask = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!window.ethereum || !isConnected) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const TaskContract = new ethers.Contract(TaskContractAddress, TaskAbi, signer);
    const taskText = input;
    const isDeleted = false;
    await TaskContract.addTask(taskText, isDeleted);
    setInput(''); // Clear the input field
    getAllTasks(); // Refresh the tasks list
}

const deleteTask = async (taskId) => {
    if (!window.ethereum || !isConnected) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const TaskContract = new ethers.Contract(TaskContractAddress, TaskAbi, signer);
    await TaskContract.deleteTask(taskId, true);
    getAllTasks(); // Refresh the tasks list
}

return (
  <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex flex-col justify-center items-center">
    {isConnected ? (
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-8">Task Management Dapp</h1>
        <p className="text-lg text-center text-gray-600 mb-6">Your personal task manager powered by blockchain.</p>
        <p className="text-lg font-medium text-center text-gray-600 mb-8">Connected to Metamask Account: {account}</p>
        <form className="space-y-4" onSubmit={addTask}>
          <input className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500" type="text" id="task" value={input}
            placeholder='Enter Your Tasks...'
            onChange={e => setInput(e.target.value)}
          />
          <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            type="submit">Add Task</button>
        </form>
        <ul className="mt-8 space-y-4">
          {tasks.map((task, index) => 
            <Task 
              key={task.id} 
              taskText={task.taskText} 
              onClick={() => deleteTask(task.id)}
            />
          )}
        </ul>
      </div>
    ) : (
      <Login connectWallet={connectToMetamask} />
    )}
</div>
)
}

export default App;
