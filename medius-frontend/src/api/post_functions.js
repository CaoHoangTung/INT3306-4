import { createComment } from './comments';
import { createUserPost } from './users_posts';


// list of functions
// - commentPost
// - upVotePost
// - downVotePost
// - savePost
// - unsavePost
// - blockPost
// - unblockPost

export async function commentPost(postId, userId, content) {
    try {
        const comment = {
            post_id: postId,
            user_id: userId,
            content: content,
        };
        const response = await createComment(comment);
        return response;
    } catch (error) {
        alert("Cannot comment now. Try again later");
        console.log(error);
        return false;
    }
}

export async function upvotePost(postId, userId) {
    try {
        const upvote = {
            post_id: postId,
            user_id: userId,
            is_upvote: true,
            is_downvote: false,
        };
        const response = await createUserPost(upvote);
        return response;
    } catch (error) {
        alert("Cannot upvote now. Try again later");
        console.log(error);
        return false;
    }
}

export async function downvotePost(postId, userId) {
    try {
        const downvote = {
            post_id: postId,
            user_id: userId,
            is_upvote: false,
            is_downvote: true,
        };
        const response = await createUserPost(downvote);
        return response;
    } catch (error) {
        alert("Cannot downvote now. Try again later");
        console.log(error);
        return false;
    }
}

export async function unupvotePost(postId, userId) {
    try {
        const upvote = {
            post_id: postId,
            user_id: userId,
            is_upvote: false,
        };
        const response = await createUserPost(upvote);
        return response;
    } catch (error) {
        alert("Cannot un-upvote now. Try again later");
        console.log(error);
        return false;
    }
}

export async function undownvotePost(postId, userId) {
    try {
        const downvote = {
            post_id: postId,
            user_id: userId,
            is_downvote: false,
        };
        const response = await createUserPost(downvote);
        return response;
    } catch (error) {
        alert("Cannot un-downvote now. Try again later");
        console.log(error);
        return false;
    }
}

export async function savePost(postId, userId) {
    try {
        const save = {
            post_id: postId,
            user_id: userId,
            is_saved: true,
            is_blocked: false,
        };
        console.log(save);
        const response = await createUserPost(save);
        return response;
    } catch (error) {
        alert("Cannot save now. Try again later");
        console.log(error);
        return false;
    }
}

export async function blockPost(postId, userId) {
    try {
        const block = {
            post_id: postId,
            user_id: userId,
            is_saved: false,
            is_blocked: true,
        };
        const response = await createUserPost(block);
        return response;
    } catch (error) {
        alert("Cannot block now. Try again later");
        console.log(error);
        return false;
    }
}

export async function unsavePost(postId, userId) {
    try {
        const unsave = {
            post_id: postId,
            user_id: userId,
            is_saved: false,
        };
        const response = await createUserPost(unsave);
        return response;
    } catch (error) {
        alert("Cannot unsave now. Try again later");
        console.log(error);
        return false;
    }
}

export async function unblockPost(postId, userId) {
    try {
        const unblock = {
            post_id: postId,
            user_id: userId,
            is_blocked: false,
        };
        const response = await createUserPost(unblock);
        return response;
    } catch (error) {
        alert("Cannot unblock now. Try again later");
        console.log(error);
        return false;
    }
}

