import API from "./api";

export async function getAllPostsOfUserId(userId) {
    const response = await API.get(`posts/all/${userId}`);
    return response?.data;
}

export async function getPost(postId) {
    const response = await API.get(`posts/view/${postId}`);
    return response?.data;
}

export async function createPost(post) {
    const response = await API.post(`posts/create`, {}, {params: post});
    return response?.data;
}

export async function deletePost(postId) {
    const response = await API.delete(`posts/delete?post_id=${postId}`)
}