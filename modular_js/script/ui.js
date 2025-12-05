import { deleteUser, updateUser } from "./crud.js";

export function renderUsers(users) {
    const mainDiv = document.getElementById("userList");
    mainDiv.innerHTML = "";

    users.forEach((user) => {
        let card = document.createElement("div");
        card.className = "card";

        let name = document.createElement("h3");
        name.textContent = user.name;

        let age = document.createElement("p");
        age.textContent = `Age: ${user.age}`;

        let editBtn = document.createElement("button");
        editBtn.className = "btnEdit";
        editBtn.textContent = "Edit";
        // editBtn.onclick = () => updateUserInDB(user.id, user.name, user.age);

        editBtn.addEventListener("click", () => {
            updateUser(user.id, user.name, user.age);
        })

        let delBtn = document.createElement("button");
        delBtn.className = "btnDel";
        delBtn.textContent = "Delete";
        // delBtn.onclick = () => deleteUserFromDB(user.id);

        delBtn.addEventListener("click", () => {
            deleteUser(user.id);
        })


        card.appendChild(name);
        card.appendChild(age);
        card.appendChild(editBtn);
        card.appendChild(delBtn);

        mainDiv.appendChild(card);
    });
}