import React, { useContext, useState } from 'react'
import TodoContext, { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const AddTodo = () => {
    const [text, setText] = useState("");



    return (
        <div style={{ border: "1px solid red", marginTop: 50 }}>
            <TodoItem text={text}/>
        </div>
    )
}

export default AddTodo



















