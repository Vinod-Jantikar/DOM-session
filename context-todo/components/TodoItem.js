import React, { useState } from 'react'

const TodoItem = ({ text }) => {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <span>{text}</span>
                    </li>
                </ul>
            </div>


            <div>
                <button onClick={update}>Update</button>
            </div>

        </>
    )
}

export default TodoItem
