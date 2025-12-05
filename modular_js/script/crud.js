import { addUserToDB, deleteUserFromDB, getUsersFromDB, updateUserInDB } from "./api.js";
import { renderUsers } from "./ui.js";

export async function addUsers() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();

    if (!name || !age) {
        alert("Please enter name and age.");
        return;
    }

    const data = { name, age };

    await addUserToDB(data)

    alert("User added successfully");

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    getUsers()
}


export async function getUsers() {
    const data = await getUsersFromDB();

    const usersArray = data
        ? Object.entries(data).map(([id, user]) => ({
            id,
            ...user
        }))
        : [];

    renderUsers(usersArray)
}


export async function updateUser(id, oldName, oldAge) {
    const name = prompt("Enter new name", oldName); // Ask new name
    const age = prompt("Enter new age", oldAge);     // Ask new age

    if (!name || !age) return; // Validation

    const updatedUser = { name, age }; // New object

    await updateUserInDB(id, updatedUser);

    alert("User updated!");
    getUsers();
}

export async function deleteUser(id) {
    await deleteUserFromDB(id);
    alert("User deleted!");

    getUsers();
}
