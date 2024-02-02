const Task = ({ taskText, onClick }) => {
    return (
       <div className="flex items-center justify-between p-4 mb-2 bg-white shadow rounded-md">
         <p className="font-semibold text-gray-700">{taskText}</p>
         <button
           onClick={onClick}
           className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
         >
           Delete
         </button>
       </div>
    );
   };
   
   export default Task;
   