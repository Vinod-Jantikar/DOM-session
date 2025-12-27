const { createContext, useState, useContext, useEffect } = require("react");

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }])
    }

    const toggleTodo = (id) => {
        const completedTodos = todos.map((todo) => todo.id === id ? { ...todo, completed: true } : todo)
        setTodos(completedTodos)
    }

    const fetchData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}


export default TodoContext;


// export const useTodos = () => useContext(TodoContext)