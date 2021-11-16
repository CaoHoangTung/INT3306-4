import API from "./api";

export async function getUserRelationAll() {
    const response = await API.get(`/userrelation/all`);
    return response?.data;
}

export async function getUserRelationByUserId1(userId1) {
    const response = await API.get(`/userrelation/view-by-user-id-1/${userId1}`);
    return response?.data;
}

export async function getUserRelationByUserId2(userId2) {
    const response = await API.get(`/userrelation/view-by-user-id-2/${userId2}`);
    return response?.data;
}

export async function getUsersIsBlockedByUserId(userId) {
    const response = await API.get(`/userrelation/view-all-users-is-blocked-by-user-id/${userId}`);
    return response?.data;
}

export async function getUsersIsFollowedByUserId(userId) {
    const response = await API.get(`/userrelation/view-all-users-is-followed-by-user-id/${userId}`);
    return response?.data;
}

export async function getUsersBlockUserId(userId) {
    const response = await API.get(`/userrelation/view-all-users-block-user-id/${userId}`);
    return response?.data;
}

export async function getUsersFollowUserId(userId) {
    const response = await API.get(`/userrelation/view-all-users-follow-user-id/${userId}`);
    return response?.data;
}

export async function getUserRelation(userId1, userId2) {
    const response = await API.get(`/userrelation/view/${userId1}/${userId2}`);
    return response?.data;
}

export async function createUserRelation(userrelation) {
    const response = await API.post(`/userrelation/create`, userrelation);
    return response?.data;
}

export async function updateUserRelation(userrelation) {
    const response = await API.put(`/userrelation/update`, userrelation);
    return response?.data;
}

export async function deleteUserRelation(userId1, userId2) {
    var body = {
        user_id_1: userId1,
        user_id_2: userId2
    };
    const response = await API.delete(`/userrelation/delete`, { data: body });
    return response?.data;
}