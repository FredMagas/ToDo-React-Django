import React, { useState } from 'react'
import {MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import axios from 'axios'

const Table = ({todos, setTodos, isLoading}) => {

    const [editText, setEditText] = useState ({
        'body' : ""
    })

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            const newList = todos.filter(todo => todo.id !== id)
            setTodos(newList)
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id, value) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
            setTodos(newTodos)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckbox = (id, value) => {
        handleEdit( id, {
            'completed' : !value
        })
    }

    const handleChange = (e) => {
        setEditText( prev => ({
            ...prev,
            'body' : e.target.value
        }))
        console.log(editText)
    }

    const handleClick = () => {
        handleEdit(editText.id, editText)
        setEditText({
            'body' : ""
        })
    }

  return (
    <div className='py-2'>
        <table className='max-w-8xl text-base sm:text-lg'>
            <thead className='border-b-2 border-black'>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-center'>Checkbox</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-center'>To Do</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-center'>Status</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-center'>Data Created</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? <div className='m-8'><span className="loading loading-spinner text-accent"></span></div> :
                <>
                    {todos.map( (todoItem, index) => {
                        return (
                            <tr key={todoItem.id} className='border-b border-black items-center align-middle'>
                                <td className='p-3 text-center'>
                                    <label className="cursor-pointer label flex items-center justify-center">
                                        <input type="checkbox" onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                                        className={`inline-block cursor-pointer checkbox ${todoItem.completed ?  'checkbox-accent' : 'checkbox-error' }`}/>
                                    </label>
                                </td>
                                <td className='p-3 text-sm text-center'>{todoItem.body}</td>
                                <td className='p-3 text-sm text-center'>
                                    <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-300' : 'bg-red-300'} `}>
                                        {todoItem.completed ? 'Done' : 'Incomplete'}
                                    </span>
                                </td>
                                <td className='p-3 text-sm text-center'>{new Date(todoItem.created).toLocaleString()}</td>
                                <td className='p-3 flex flex-col sm:flex-row content-around text-base sm:text-lg justify-center'>
                                    <div className="lg:tooltip" data-tip="Edit">
                                        <span className='text-2xl cursor-pointer'>
                                            <label htmlFor="my_modal_6" className="btn mb-2 sm:mr-2 text-lg hover:bg-gray-600"><MdEditNote onClick={() => setEditText(todoItem)} /></label>
                                        </span>
                                    </div>
                                    <div className="lg:tooltip tooltip-error" data-tip="Delete">
                                        <span className=' text-2xl cursor-pointer'>
                                            <label className="btn btn-error text-lg hover:bg-red-600"><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></label>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }</>}
            </tbody>
        </table>

        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg dark:text-white">Edit ToDo</h3>
                <input type="text" value={editText.body} onChange={handleChange} className="input input-bordered w-full mt-8 mb-4 dark:text-white" />
                <div className="modal-action">
                    <label htmlFor="my_modal_6" onClick={handleClick} className="btn btn-primary dark:text-white">Edit</label>
                    <label htmlFor="my_modal_6" className="btn dark:text-white">Close!</label>
                </div>
            </div>
        </div>

    </div>


  )
}

export default Table