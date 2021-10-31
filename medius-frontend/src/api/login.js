import API from "./api";
import { setCredential } from "../utils/auth";

export async function login(username, password) {
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password)
    try {
        const response = await API.post(`login/access-token`, bodyFormData);
        setCredential(response.data);
        return true
    } catch (error) {
        alert("Invalid username or password")
        console.log(error);
        return false
    }
}