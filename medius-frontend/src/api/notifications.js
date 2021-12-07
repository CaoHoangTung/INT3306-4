import API from "./api";

export async function getNotificationAll() {
    const response = await API.get("/notification/all");
    return response?.data;
}

export async function getNotificationByUserId1(userId1) {
    const response = await API.get(`/notification/view-by-user-id-1/${userId1}`);
    return response?.data;
}

export async function getNotificationByUserId2(userId2) {
    const response = await API.get(`/notification/view-by-user-id-2/${userId2}`);
    return response?.data;
}

export async function getNotification(notificationId) {
    const response = await API.get(`/notification/view/${notificationId}`);
    return response?.data;
}

export async function createNotification(notification) {
    const response = await API.post("/notification/create", notification);
    return response?.data;
}

export async function updateNotification(notification) {
    const response = await API.put("/notification/update", notification);
    return response?.data;
}

export async function deleteNotification(notificationId) {
    var body = {
        notification_id: notificationId
    };
    const response = await API.delete("/notification/delete", { data: body });
    return response?.data;
}