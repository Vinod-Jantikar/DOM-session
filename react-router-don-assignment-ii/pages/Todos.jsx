import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Todos = () => {
    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login")
    }

    console.log(setTodos);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then((data) => setTodos(data.slice(0, 10)))
    }, [])


    return (
        <div>
            <div>
                <h2>Todos</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>


            <div>
                {
                    todos.map((todo) =>
                        <Link key={todo.id} to={`/todos/${todo.id}`} className='card'> {todo.title} - {todo?.completed ? "True" : "False"
                        }</Link>
                    )
                }
            </div>

        </div>
    )
}

export default Todos
