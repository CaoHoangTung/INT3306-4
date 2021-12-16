import API from "./api";

export async function getAllRoles() {
    const response = await API.get(`/role/all`);
    return response?.data;
}
