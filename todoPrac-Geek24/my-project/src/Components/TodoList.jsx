import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodos = () => {
    if (inputValue !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        idEdit:false,
      };
      setTodos([newTodo,...todos]);
    }

    setInputValue("");
  };

  const handleCheckChange = (id) => {
    console.log(id);
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit =(id)=>{
    //  change isEdit property to true
    setTodos(todos.map((each)=>each.id ===id ? {...each, isEdit: !each.isEdit} : each ))
    
  }

  const handleDelete = (id) => {
    const filteredTodo = todos.filter((each) => each.id !== id);
    setTodos(filteredTodo);
  };

  const handleEditChange =(e,id)=>{
    console.log(e.target.value);
    setTodos(todos.map((each)=>each.id ===id ? {...each,text:e.target.value} : each) )
  }


  useEffect(()=>{
    const savedTodo=JSON.parse(localStorage.getItem("MyTodo"))
    if( savedTodo && savedTodo.length>0)
    {
        setTodos(savedTodo)
    }
    
  },[])

  useEffect(()=>{
    if(todos.text!=="")
   localStorage.setItem("MyTodo", JSON.stringify(todos))
  },[todos])


 



  return (
    <div className="p-4 bg-gray-200 min-h-screen w-full">
      <div className="container mx-auto flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Todos</h1>
        <div className="w-full max-w-md">
          <div className="flex items-center border-b border-b-2 border-gray-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
              type="text"
              placeholder="Enter Task"
              onChange={handleInputChange}
              value={inputValue}
            />
            <button
              className="flex-shrink-0 bg-green-500 hover:bg-green-700 text-sm text-white py-1 px-2 rounded"
              onClick={handleAddTodos}
            >
              Add
            </button>
          </div>
          <ul className="list-decimal p-2">
            {todos.map((each) => (
              <li
                key={each.id}
                className="border-solid border-2 border-black flex flex-row mb-2"
              >
                {each.isEdit ? 
                <>
                <input type="text" 
                className="flex-1 bg-red-300"
                value={each.text.toUpperCase()}  
                onChange={(e)=>handleEditChange(e,each.id)}
                /> 
                <button className="border-solid border-2 border-black bg-green-300 p-1 rounded-md"
                onClick={()=>handleEdit(each.id) }
                >
                 {each.isEdit ?"📁" : "✏️"}
               </button>
               </>
                : 

                <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600 mr-2"
                    onChange={() => handleCheckChange(each.id)}
                  />
                  <span
                    className={`block pl-2 font-bold w-full ${
                      each.completed ? "line-through" : "none"
                    }`}
                    onChange={handleEditChange}
                  >
                    {each.text.toUpperCase()}
                  </span>
                  {/* when clicked on edit the button chnages to save edit  */}
                  <button className="border-solid border-2 border-black bg-green-300 p-1 rounded-md"
                   onClick={()=>handleEdit(each.id) }
                  >
                    {each.isEdit ?"📁" : "✏️"}
                  </button>

                  {each.completed && (
                    <button
                      className="ml-2 bg-red-200 hover:bg-red-300 text-red-900 font-semibold py-1 px-3 rounded"
                      onClick={() => handleDelete(each.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>


                }

                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
