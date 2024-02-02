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
    if (isConnected) {
      getAllTasks();
    }
 }, [isConnected]);

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
    <div className="container mx-auto px-4">
      {isConnected ? (
        <div>
          <h1 className="text-4xl font-bold text-center">Welcome to Task Management Dapp</h1>
          <p className="mt-4">Metamask Account: {account}</p>
          <form className="flex items-center justify-center" onSubmit={addTask}>
            <input className="border border-gray-300 rounded py-2 px-4 w-full" type="text" id="task" value={input}
              placeholder='Enter Your Tasks...'
              onChange={e => setInput(e.target.value)}
            />
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit">Add Task</button>
          </form>
          <ul className="list-none space-y-2 mt-4">
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
