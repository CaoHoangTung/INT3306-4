import API from "./api";

export async function getAllTopics() {
    const response = await API.get(`/topic/all`);
    return response?.data;
}

export async function getTopic(id) {
    const response = await API.get(`/topic/view/${id}`);
    return response?.data;
}

export async function createTopic(topic) {
    const response = await API.post(`/topic/create`, topic);
    return response?.data;
}

export async function updateTopic(topic) {
    const response = await API.put(`/topic/update`, topic);
    return response?.data;
}

export async function deleteTopic(topicId) {
    var body = {
        'topic_id': topicId
    };
    const response = await API.delete(`/topic/delete`, body);
    return response?.data;
}
