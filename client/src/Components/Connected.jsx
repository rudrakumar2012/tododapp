const Connected = (props) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mb-4 text-2xl font-bold">Welcome to ToDoList Dapp</h1>
            <p>Metamask Account: {props.account}</p>
        </div>
    )
}

export default Connected;