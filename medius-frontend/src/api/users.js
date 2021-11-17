import API from "./api";

export async function getAllUsers() {
    const response = await API.get(`/users/all`);
    return response?.data;
}

export async function getUser(id) {
    const response = await API.get(`/users/view/${id}`);
    return response?.data;
}

export async function createUser(user) {
    const response = await API.post("/user/create", user);
    return response?.data;
}

export async function updateUser(user) {
    const response = await API.post("/user/update", user);
    return response?.data;
}

export async function deleteUser(email) {
    var body = {
        "email": email
    };
    const response = await API.delete(`/user/delete`, body);
    return response?.data;
}