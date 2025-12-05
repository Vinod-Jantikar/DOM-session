const BASE_URL = "https://crud-firebase-8900c-default-rtdb.asia-southeast1.firebasedatabase.app/";


export async function addUserToDB(data) {
    return await fetch(`${BASE_URL}users.json`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}


export async function getUsersFromDB() {
    const response = await fetch(`${BASE_URL}users.json`);
    return response.json()
}


export async function updateUserInDB(id, updatedUser) {
    return await fetch(`${BASE_URL}users/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser)
    });
}


export async function deleteUserFromDB(id) {
    return await fetch(`${BASE_URL}users/${id}.json`, {
        method: "DELETE" // DELETE request
    });
}
