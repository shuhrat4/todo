import React, { useContext, useState, useEffect } from 'react'
import { Context } from './Context/Context'
import Modal from './Modal'

const TodoList = () => {
  const { todos, setTodos } = useContext(Context)
  const [isOpenModal, setisOpenModal] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [setTodos])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  function DeleteTodo(id) {
    const updatedTodos = todos.filter(item => item.id !== id)
    setTodos(updatedTodos)
  }

  function UpdateTodo(id) {
    const todoToEdit = todos.find(item => item.id === id)
    setCurrentTodo(todoToEdit)
    setisOpenModal(true)
  }

  function handleSave(updatedTitle) {
    const updatedTodos = todos.map(item =>
      item.id === currentTodo.id ? { ...item, title: updatedTitle } : item
    )
    setTodos(updatedTodos)
    setisOpenModal(false)
  }

  return (
    <>
      <ul className='w-[500px] mx-auto flex flex-col gap-5 mt-[50px]'>
        {todos.map((item, index) => (
          <li key={index} className='w-full bg-white text-black rounded-md p-[10px] flex justify-between'>
            <div className='flex gap-3'>
              <span>{index + 1}.</span>
              {item.title}
            </div>
            <div className='flex items-center gap-3'>
              <button onClick={() => UpdateTodo(item.id)} className='bg-blue-500 text-white py-1 px-3 rounded'>
                Update
              </button>
              <button onClick={() => DeleteTodo(item.id)} className='bg-red-500 text-white py-1 px-3 rounded'>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpenModal={isOpenModal} setisOpenModal={setisOpenModal}>
        <form onSubmit={(e) => {
          e.preventDefault()
          const updatedTitle = e.target.elements.todoTitle.value
          handleSave(updatedTitle)
        }}>
          <input
            type="text"
            name="todoTitle"
            defaultValue={currentTodo?.title}
            className="w-[79%] p-2 border border-gray-400 rounded-md"
            required
          />
          <button type="submit" className="w-[19%] ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
            Save
          </button>
        </form>
      </Modal>
    </>
  )
}

export default TodoList
