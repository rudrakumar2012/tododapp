const Login = (props) => {
    return (
      <div>
        <h1>Welcome to Dapp</h1>
        <button onClick={props.connectWallet}>Login Metamask</button>
      </div>
    );
  };
  
  export default Login;