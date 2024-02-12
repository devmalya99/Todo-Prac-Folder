

import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo: "Todo msg 1 ",
            completed:false
        },
    ],
    addTodo: ()=>{},
    updatedTodo:(id,todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{}
})


export const useTodo =()=>{
    return useContext(TodoContext)
}

export const TodoProvider =TodoContext.Provider
