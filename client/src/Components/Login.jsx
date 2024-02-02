const Login = (props) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-8">Welcome to Dapp</h1>
          <button
            onClick={props.connectWallet}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Login Metamask
          </button>
        </div>
      </div>
    );
  };
  
  export default Login;