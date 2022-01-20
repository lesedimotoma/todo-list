import './App.css';
import apiHelper from './ApiHelper';
import React, { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await apiHelper.getAllTodos()
      setTodos(todos)
      console.log(todos)
    }

    fetchTodoAndSetTodos()
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    if(!todo) {
      alert("please enter somethng")
      return
    }

    if (todos.some(({task}) => task === todo)){
      alert(`Task: ${todo} already exists`)
      return
    }
    const newTodo = await apiHelper.createTodo(todo)
    setTodos([...todos, newTodo])
  }

  const deleteTodo = async (e, id) => {
    try{
      e.stopPropagation()
      await apiHelper.deleteTodo(id)
      setTodos(todos.filter(({ _id: i}) => id !== i))
    }catch (err){}
  }

  const updateTodo = async (e, id) => {
    //e is the onClick event object
    e.stopPropagation() // prevent click event from propagating to the parent element
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed,
    }

    const updatedTodo = await apiHelper.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo: todo)))
  }

  return (
    <div className='App'>
      <div >
        <h1>Todo</h1>
        <input 
          id='todo-input'
          type='text'
          placeholder='Add a todo'
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
          className='input'
        />
        <button className='todo-button' type='button' onClick={createTodo}> Add </button>
      </div>

      <ul className='list'>
        {todos.map(({_id, task, completed }, i) => (
          <li 
            key={i}
            onClick={e => updateTodo(e,_id)}
            className={completed ? "todo-row completed" : "todo-row"}
          >
            {task} <span onClick = {e => deleteTodo(e, _id)} className={completed ?'remove-todo remove-complete': 'remove-todo'}>x</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
