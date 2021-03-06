import API from "./api";

export async function getAllUsers(sort_by_posts_count = null, sort_by_num_followers = null) {
    var getParams = {};
    if (sort_by_posts_count != null) {
        getParams.sort_by_posts_count = sort_by_posts_count;
    }
    if (sort_by_num_followers != null) {
        getParams.sort_by_num_followers = sort_by_num_followers;
    }
    const response = await API.get(`/users/all`, {
        params: getParams
    });
    return response?.data;
}

export async function getUser(user_id) {
    const response = await API.get(`/users/view/${user_id}`);
    return response?.data;
}

export async function getUserByEmail(email) {
    const response = await API.get(`users/view-by-email`, {
        params: {
            email: email
        }
    });
    return response?.data;
}

export async function createUser(user) {
    if (user.avatar_path == null) {
        user.avatar_path = `https://avatars.dicebear.com/api/adventurer-neutral/${user.email}.svg`
    }
    const response = await API.post("/users/create", user);
    return response?.data;
}

export async function updateUser(user) {
    const response = await API.put("/users/update", user);
    return response?.data;
}

export async function deleteUser(user_id) {
    var body = {
        "user_id": user_id
    };
    const response = await API.delete(`/users/delete`, { data: body });
    return response?.data;
}

export async function searchUsers(searched_text) {
    const response = await API.get(`users/search`, {
        params: {
            text: searched_text
        }
    });
    return response?.data;
}

export async function resetPassword(token, password) {
    const response = await API.post(`passwordreset/change-password`, {
        hashed_password: password
    },
        {
            params: {
                token: token,
            }
        });
    return response?.data;
}

export async function sendResetPasswordRequest(email) {
    const response = await API.post(`passwordreset/send-password-token`, {
        email: email
    });
    return response?.data;
}