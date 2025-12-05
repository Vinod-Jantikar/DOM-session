import { addUsers, getUsers } from "./crud.js";

document.getElementById("addUserBtn").addEventListener("click", addUsers);

getUsers();