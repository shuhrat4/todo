import React, { useContext, useRef } from 'react'
import { Context } from './Context/Context'

function TodoForm() {
  const { todos, setTodos, AddTodo } = useContext(Context)
  const inputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    const todo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      title: inputRef.current.value,
      isComplated: false,
    }
    AddTodo(todo)
    e.target.reset()
  }

  return (
    <div className="max-w-[500px] mx-auto mt-[70px] py-4 px-3 bg-white border border-gray-200 rounded-md shadow-sm">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter your todo"
          required
          className="flex-grow border border-gray-300 px-3 py-2 rounded focus:outline-none"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Add
        </button>
      </form>
    </div>
  )
}

export default TodoForm
