import API from "./api";
import qs from "qs";

export async function getCommentAll() {
    const response = await API.get("/comment/all");
    return response?.data;
}

export async function getCommentByPostId(postId, user_detail = true) {
    const query = qs.stringify({
        user_detail
    });

    const response = await API.get(`/comment/view-by-post-id/${postId}?${query}`);
    return response?.data;
}

export async function getCommentByUserId(userId) {
    const response = await API.get(`/comment/view-by-user-id/${userId}`);
    return response?.data;
}

export async function getComment(id) {
    const response = await API.get(`/comment/view/${id}`);
    return response?.data;
}

export async function createComment(comment) {
    const response = await API.post("/comment/create", comment);
    return response?.data;
}

export async function updateComment(comment) {
    const response = await API.put("/comment/update", comment);
    return response?.data;
}

export async function deleteComment(commendId) {
    var body = {
        comment_id: commendId
    };
    const response = await API.delete("/comment/delete", { data: body });
    return response?.data;
}