import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const TodoDetails = () => {
    const { todoId } = useParams();
    const [todo, setTodo] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
            .then((res) => res.json())
            .then((data) => setTodo(data))
    }, [todoId]);

    if(!todo) {
        return <p className='container'>Loading......</p>
    }

    return (
        <div className='container card'>
            <h2>Todo Details</h2>
            <p>ID: {todo.id}</p>
            <p>Title: {todo.title}</p>
            <p>
                Status: {todo.completed ? "COMPLETED" : "NOT COMPLETED"}
            </p>
        </div>
    )
}

export default TodoDetails
