import axios from "axios";
import { useEffect, useState } from "react"


const BASE_URL = 'https://users-crud-firebase-app-default-rtdb.asia-southeast1.firebasedatabase.app/users'

const AxiosUsers = () => {
    const [inputData, setInputData] = useState({
        name: "",
        email: ""
    });
    const [users, setUsers] = useState({});
    const [userId, setUserId] = useState(null)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = inputData;

            if (userId) {
                const update = await axios.put(`${BASE_URL}/${userId}.json`, payload);
                setUserId(null)
            } else {
                const users = await axios.post(`${BASE_URL}.json`, payload);
            }

            setInputData({
                name: "",
                email: ""
            })


            fetchUsers();
        } catch (error) {
            console.log(error)
        }
    };


    const fetchUsers = async () => {
        try {
            const users = await axios.get(`${BASE_URL}.json`);
            setUsers(users.data || {})
        } catch (error) {
            console.log(error)
        }
    }


    const handleEdit = async (id) => {
        try {
            setUserId(id);

            setInputData((prev) => ({
                ...prev,
                name: users[id].name,
                email: users[id].email
            }))


        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (id) => {
        try {
                const user = await axios.delete(`${BASE_URL}/${id}.json`);
                alert("User deleted successfully.");
                fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchUsers()
    }, []);


    return (
        <>
            <div style={{ width: '30%', marginTop: "150px", margin: 'auto', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", border: '1px solid white' }}>

                <h1>Enter User Details</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Name" name="name" value={inputData.name} onChange={handleChange} style={{ width: '90%', margin: 10, padding: '10px' }} />


                    <input type="text" placeholder="Enter Email" name="email" value={inputData.email} onChange={handleChange} style={{ width: '90%', margin: 10, padding: '10px' }} />

                    <button style={{ width: '50%', color: 'White', backgroundColor: '#1E88E5', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>{userId ? "Update" : "Add"}</button>



                </form>
            </div>


            <ul>
                {
                    Object.keys(users).map((id) => (
                        <li key={id}>

                            {users[id].name} <strong>{users[id].email} </strong>

                            <button onClick={() => handleEdit(id)}>Edit</button>


                            <button onClick={() => handleDelete(id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>


        </>
    )
}

export default AxiosUsers
