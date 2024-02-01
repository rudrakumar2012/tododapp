const Login = (props) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="mb-4 text-2xl font-bold">Welcome to Dapp</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={props.connectWallet}>Login Metamask</button>
      </div>
    );
  };
  
  export default Login;