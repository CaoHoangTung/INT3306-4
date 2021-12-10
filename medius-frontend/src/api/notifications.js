import API from "./api";
import qs from "qs";

export async function getNotificationAll(unseen_filter = true, user_detail = true) {
    const query = qs.stringify({
        unseen_filter,
        user_detail
    });
    
    const response = await API.get(`/notification/all?${query}`);
    return response?.data;
}

export async function getNotificationByUserId1(userId1, unseen_filter = true, user_detail = true) {
    const query = qs.stringify({
        unseen_filter,
        user_detail
    });

    const response = await API.get(`/notification/view-by-user-id-1/${userId1}?${query}`);
    return response?.data;
}

export async function getNotificationByUserId2(unseen_filter = false, user_detail = true) {
    const query = qs.stringify({
        unseen_filter,
        user_detail
    });

    const response = await API.get(`/notification/view-by-user-id-2?${query}`);
    return response?.data;
}

export async function getNotification(notificationId, user_detail = true) {
    const query = qs.stringify({
        user_detail
    });

    const response = await API.get(`/notification/view/${notificationId}?${query}`);
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