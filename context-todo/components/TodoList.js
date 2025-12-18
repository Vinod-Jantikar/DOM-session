import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import TodoContext from '../context/TodoContext'

const TodoList = () => {

    const { todos } = useContext(TodoContext)

    return (
        <div>
            {
                todos.map((todo) => (

                    <TodoItem item={todo.text} />

                ))
            }
        </div>
    )
}

export default TodoList
