import API from "./api";

export async function getUserTopicAll() {
    const response = await API.get("/usertopic/all");
    return response?.data;
}

export async function getUserTopicByUserId(userId) {
    const response = await API.get(`/usertopic/view-by-user-id/${userId}`);
    return response?.data;
}

export async function getUserTopicByTopicId(topicId) {
    const response = await API.get(`/usertopic/view-by-topic-id/${topicId}`);
    return response?.data;
}

export async function getUserTopic(userId, topicId) {
    const response = await API.get(`/usertopic/view?user_id=${userId}&topic_id=${topicId}`);
    return response?.data;
}

export async function createUserTopic(usertopic) {
    const response = await API.topic("/usertopic/create", usertopic);
    return response?.data;
}

export async function updateUserTopic(usertopic) {
    const response = await API.topic("/usertopic/update", usertopic);
    return response?.data;
}

export async function deleteUserTopic(userId, topicId) {
    var body = {
        user_id: userId,
        topic_id: topicId
    };
    const response = await API.topic("/usertopic/delete", body);
    return response?.data;
}