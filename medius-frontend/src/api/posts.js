import API from "./api";
import qs from "qs";


export async function getPosts(user_id = null, topic_ids = [], sort_by_upvote = null, page = 0, limit = null, search) {
    const offset = page * limit;
    const query = qs.stringify({
        user_id,
        offset
    });

    if (limit !== null) {
        query.limit = limit;
    }

    if (topic_ids.length > 0) {
        query.topic_ids = topic_ids;
    }

    if (sort_by_upvote !== null) {
        query.sort_by_upvote = sort_by_upvote;
    }

    console.log(query);
    const response = await API.get(`/posts/all?${query}`);
    return response?.data;
}

export async function getAllPostsOfUserId(user_id, topic_ids = [], sort_by_upvote = null) {
    const getParams = {
        user_id: user_id,
    }
    if (topic_ids != null) {
        getParams.topic_ids = topic_ids;
    }
    if (sort_by_upvote != null) {
        getParams.sort_by_upvote = sort_by_upvote;
    }
    const response = await API.get(`posts/all`, {
        params: getParams,
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        }
    });
    return response?.data;
}

export async function getPost(id) {
    const response = await API.get(`posts/view/${id}`);
    return response?.data;
}

export async function createPost(post) {
    const response = await API.post("posts/create", post);
    return response?.data;
}

export async function updatePost(post) {
    const response = await API.post("posts/update", post);
    return response?.data;
}

export async function deletePost(postId) {
    const body = {
        "post_id": postId
    };
    const response = await API.delete(`posts/delete`, { data: body });
    return response?.data;
}

export async function searchPosts(searched_text) {
    const response = await API.get(`posts/search`, {
        params: {
            searched_text: searched_text
        }
    });
    return response?.data;
}