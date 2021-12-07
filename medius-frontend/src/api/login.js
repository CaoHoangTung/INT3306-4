import API from "./api";
import { removeLocalCredential, setCredential } from "../utils/auth";
import { createUser } from "./users";

export async function login(username, password) {
    removeLocalCredential();
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    try {
        const response = await API.post(`login/access-token`, bodyFormData);
        setCredential(response.data);
        return response;
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function logout() {
    removeLocalCredential();
    return true;
}

export async function register(first_name, last_name, email, password) {
    var body = {
        role_id: 5,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    };
    try {
        return await createUser(body);
    } catch (error) {
        console.log(error);
        return false
    }
}