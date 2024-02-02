function Task(props) {
    return (
        <div>
            <h1 className="my-4">Welcome to Task Management Dapp</h1>
            <p className="mb-4">Metamask Account: {props.account}</p>
        </div>
    );
}

export default Task