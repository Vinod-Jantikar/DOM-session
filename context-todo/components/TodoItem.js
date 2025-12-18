import React from 'react'

const TodoItem = ({ item }) => {
    return (
        <div>
            <ul>
                <li>
                    <span>{item}</span>
                </li>
            </ul>
        </div>
    )
}

export default TodoItem
