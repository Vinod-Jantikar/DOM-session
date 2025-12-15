import React, { useState } from 'react'
import MyFirstComponent from '../components/MyFirstComponent';
import MySecondComponent from '../components/MySecondComponent';

const Homes = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");


    const clearInputs = () => {
        setEmail("");
        setName("")
    }
    

    return (
        <>
            <div>
                <h1> This is the home page</h1>

            </div>


            <div style={{ marginBottom: 20 }}>
                <input type="text" placeholder='Enter your name' value={name} style={{ width: 200, padding: 10 }} onChange={(e) => setName(e.target.value)} />
            </div>

            <div style={{ marginBottom: 20 }}>
                <input type="text" placeholder='Enter your email' value={email} style={{ width: 200, padding: 10 }} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <button onClick={clearInputs}>Clear</button>


            <div>
                name: {name}
                <br />
                email: {email}
            </div>

            {/* <div>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div> */}
        </>
    )
}

export default Homes
