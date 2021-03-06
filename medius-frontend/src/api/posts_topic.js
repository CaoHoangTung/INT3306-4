import API from "./api";

export async function getPostTopicAll() {
    const response = await API.get("/posttopic/all");
    return response?.data;
}

export async function getPostTopicByPostId(postId) {
    const response = await API.get(`/posts/view-topics/${postId}`);
    return response?.data;
}

export async function getPostTopicByTopicId(topicId) {
    const response = await API.get(`/posttopic/view-by-topic-id/${topicId}`);
    return response?.data;
}

export async function getPostTopic(postId, topicId) {
    const response = await API.get(`/posttopic/view`, {
        params: {
            post_id: postId,
            topic_id: topicId
        }
    });
    return response?.data;
}

export async function createPostTopic(posttopic) {
    const response = await API.post("/posttopic/create", posttopic);
    return response?.data;
}

export async function updatePostTopic(posttopic) {
    const response = await API.put("/posttopic/update", posttopic);
    return response?.data;
}

export async function deletePostTopic(postId, topicId) {
    var body = {
        post_id: postId,
        topic_id: topicId
    };
    const response = await API.post("/posttopic/delete", { data: body });
    return response?.data;
}