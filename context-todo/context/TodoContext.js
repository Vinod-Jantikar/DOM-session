const { createContext, useState, useContext } = require("react");

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

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}


export default TodoContext;


// export const useTodos = () => useContext(TodoContext)