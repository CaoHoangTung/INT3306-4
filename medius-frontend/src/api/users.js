import API from "./api";

export async function getAllUsers() {
    const response = await API.get(`/users/all`);
    return response?.data;
}

export async function createUser(user) {
    const response = await API.post("/user/create", {}, {params: user});
    return response?.data;
}

export async function deleteUser(userId) {
    const response = await API.delete(`/users/delete?user_id=${userId}`);
    return response?.data;
}