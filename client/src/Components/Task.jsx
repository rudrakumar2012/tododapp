const Task = ({taskText, onClick})=> {
    return (
        <div>
            <p>{taskText}</p>
            <button onClick={onClick}>Delete</button>
        </div>
    );
}

export default Task;