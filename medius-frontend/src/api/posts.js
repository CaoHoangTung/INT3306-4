import API from "./api";

export async function getAllPostsOfUserId(id) {
    const response = await API.get(`posts/all/${id}`);
    return response?.data;
}

export async function getPost(id) {
    const response = await API.get(`posts/view/${id}`);
    return response?.data;
}

export async function createPost(post) {
    const response = await API.post("posts/create", post);
    return response?.data;
}

export async function updatePost(post) {
    const response = await API.post("posts/update", post);
    return response?.data;
}

export async function deletePost(postId) {
    var body = {
        "post_id": postId
    };
    const response = await API.delete(`posts/delete`, body);
    return response?.data;
}