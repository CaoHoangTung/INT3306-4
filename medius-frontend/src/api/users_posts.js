import API from "./api";

export async function getUserPostAll() {
    const response = await API.get("/userpost/all");
    return response?.data;
}

export async function getUserPostByUserId(userId) {
    const response = await API.get(`/userpost/view-by-user-id/${userId}`);
    return response?.data;
}

export async function getUserPostByPostId(postId) {
    const response = await API.get(`/userpost/view-by-post-id/${postId}`);
    return response?.data;
}

export async function getUserPost(userId, postId) {
    const response = await API.get(`/userpost/view?user_id=${userId}&post_id=${postId}`);
    return response?.data;
}

export async function createUserPost(userpost) {
    const response = await API.post("/userpost/create", userpost);
    return response?.data;
}

export async function updateUserPost(userpost) {
    const response = await API.post("/userpost/update", userpost);
    return response?.data;
}

export async function deleteUserPost(userId, postId) {
    var body = {
        user_id: userId,
        post_id: postId
    };
    const response = await API.post("/userpost/delete", body);
    return response?.data;
}