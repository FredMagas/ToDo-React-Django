import React, { useState } from 'react'
import axios from 'axios'

const TodoForm = ({setTodos, fetchData}) => {
  
  const [newTodo, setNewTodo] = useState({
    'body': ''
  })
  
  const handleChange = (e) => {
    setNewTodo(prev => ({
        ...prev,
        'body': e.target.value
    }))
    console.log(newTodo);
  }

  const postTodo = async () => {
    try {
        await axios.post('https://api-todo-react-django-85f51829d707.herokuapp.com/api/todo/', newTodo)
        setNewTodo( {'body': ''})
        fetchData()
    } catch (error) {
        console.log(error);
    }
  }
  
  return (


    <div className='flex flex-row'>
        <input type="text" placeholder="Add ToDo" className="input input-bordered input-accent w-full max-w-xs dark:text-white"
            onChange={handleChange} value={newTodo.body} 
            onKeyDown={ (e) => {
                if (e.key === 'Enter') {
                    postTodo()
                }
            }}
            />
        <button className="btn btn-accent ml-2" onClick={postTodo}>Add ToDo</button>
    </div>
  )
}

export default TodoForm