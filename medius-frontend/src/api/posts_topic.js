import API from "./api";

export async function getPostTopicAll() {
    const response = await API.get("/posttopic/all");
    return response?.data;
}

export async function getPostTopic(postId, topicId) {
    const response = await API.get(`/posttopic/view?post_id=${postId}&topic_id=${topicId}`);
    return response?.data;
}

export async function createPostTopic(posttopic) {
    const response = await API.post("/posttopic/create", poststopic);
    return response?.data;
}

export async function updatePostTopic(posttopic) {
    const response = await API.post("/posttopic/update", poststopic);
    return response?.data;
}

export async function deletePostTopic(postId, topicId) {
    var body = {
        post_id: postId,
        topic_id: topicId
    }
    const response = await API.post("/posttopic/delete", body);
    return response?.data;
}