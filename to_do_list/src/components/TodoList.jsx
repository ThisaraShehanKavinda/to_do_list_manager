import React, { useEffect, useState } from 'react'
import todosData from '../data/todos.json'

function TodoList() {


    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(()=>{
        setTodos(todosData);
    },[]);

    //To add task-----------------------------------------
    const addTodo = (e)=>{
        e.preventDefault();

        if (newTodo.trim()==="") return;
        const newItem = {
            id: Date.now(),
            text: newTodo,
            Completed: false
        };
        setTodos((prevTodos)=>[...prevTodos, newItem]);
        setNewTodo("");
        
    };

    //toggle completion---------------------------------------
    const toggleTodo = (id) =>{
        setTodos((prevTodos)=>{
            prevTodos.map((todo)=>
                todo.id === id ? {...todo, Completed:!todo.Completed} : todo
            )
        })
    }

  return (
    <div className='todo-container'>
        <form className='todo-form' onSubmit={addTodo}>
            <input type="text" placeholder='Add a new task' value={newTodo} onChange={(e)=> setNewTodo(e.target.value)} className='todo-input'/>
            <button type='submit' className='todo-button'>Add</button>
        </form>


        <ul>
            {todos.map((todo)=>(
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo}/>
            ))}
        </ul>
      
    </div>
  )
}

export default TodoList
