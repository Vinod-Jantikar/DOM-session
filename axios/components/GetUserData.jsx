import axios from "axios";
import React, { useEffect, useState } from "react";

const GetUserData = () => {
    const [text, setText] = useState("")
    const [users, setUsers] = useState([]);


    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });




    const fetchTheData = async () => {
        try {
            const users = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            console.log(users);

            setUsers(users.data);
        } catch (error) {
            console.log(error);
        }
    };


    const handleSubmit = async () => {
        try {

            const data = {
                text: text
            }

            const user = await axios.post('https://jsonplaceholder.typicode.com/users', data);
            console.log(user);


        } catch (error) {
            console.log(error)
        }
    }


    const deleteUser = async (user) => {
        try {

            const userId = user?.id


            const user = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
        } catch (error) {
            console.log(error)
        }
    }


    const handleChange = (e) => {
        const {name, value} = e.target;
        
        console.log("name", name)
        console.log("value", value);

        setData((prev) => ({
            ...prev,
            [name] : value
        }))
    }


    useEffect(() => {
        fetchTheData();
    }, []);

    return (

        <>
            <div style={{ width: '50%', margin: 'auto', marginTop: '50px' }}>
                <input type="text" name="name" placeholder="Enter Name" value={data.name} onChange={handleChange} style={{ width: '100%', padding: '10px' }} />

                <input type="text" name="email" placeholder="Enter Name" value={data.email} onChange={handleChange} style={{ width: '100%', padding: '10px' }} />

                <input type="text" name="password" placeholder="Enter Name" value={data.password} onChange={handleChange} style={{ width: '100%', padding: '10px' }} />

                <button onClick={handleSubmit``}>Add User</button>
            </div>

            <div style={{ width: '50%', margin: 'auto', marginTop: '100px', }}>
                <table style={{ border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid red' }}>Id</th>
                            <th style={{ border: '1px solid red' }}>Name</th>
                            <th style={{ border: '1px solid red' }}>Phone</th>
                            <th style={{ border: '1px solid red' }}>User Name</th>
                            <th style={{ border: '1px solid red' }}>Website</th>
                            <th style={{ border: '1px solid red' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr >
                                    <td style={{ border: '1px solid red' }}>{user.id}</td>
                                    <td style={{ border: '1px solid red' }}>{user.name}</td>
                                    <td style={{ border: '1px solid red' }}>{user.phone}</td>
                                    <td style={{ border: '1px solid red' }}>{user.username}</td>
                                    <td style={{ border: '1px solid red' }}>{user.website}</td>
                                    <td style={{ border: '1px solid red' }}>
                                        <button onClick={() => console.log(user)}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default GetUserData;
