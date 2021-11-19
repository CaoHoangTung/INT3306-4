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
    const response = await API.get(`/userrelation/view-blocked-users/${userId}`);
    return response?.data;
}

export async function getUsersIsFollowedByUserId(userId) {
    const response = await API.get(`/userrelation/view-followed-users/${userId}`);
    return response?.data;
}

export async function getUsersBlockingUserId(userId) {
    const response = await API.get(`/userrelation/view-blocking-users/${userId}`);
    return response?.data;
}

export async function getUsersFollowingUserId(userId) {
    const response = await API.get(`/userrelation/view-following-users/${userId}`);
    return response?.data;
}

export async function getUserRelation(userId1, userId2) {
    const response = await API.get(`/userrelation/view`, {
        params: {
            user_id_1: userId1,
            user_id_2: userId2
        }
    });
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