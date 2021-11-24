import API from "./api";

export async function getAllUsers(sort_by_posts_count=null, sort_by_num_followers=null) {
    var getParams = {};
    if (sort_by_posts_count != null) {
        getParams.sort_by_posts_count = sort_by_posts_count;
    }
    if (sort_by_num_followers != null) {
        getParams.sort_by_num_followers = sort_by_num_followers;
    }
    const response = await API.get(`/users/all`, {
        params: getParams
    });
    return response?.data;
}

export async function getUser(user_id) {
    const response = await API.get(`/users/view/${user_id}`);
    return response?.data;
}

export async function getUserByEmail(email) {
    const response = await API.get(`users/view-by-email`, {
        params: {
            email: email
        }
    });
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