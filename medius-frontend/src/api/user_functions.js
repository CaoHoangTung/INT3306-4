import { createUserRelation } from './users_users';

export async function followUser(userId, userIdFollow) {
    try {
        const userRelation = {
            user_id_1: userId,
            user_id_2: userIdFollow,
            is_following: true,
            is_blocking: false,
        };
        console.log(userRelation);
        const response = await createUserRelation(userRelation);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function unFollowUser(userId, userIdFollow) {
    try {
        const userRelation = {
            user_id_1: userId,
            user_id_2: userIdFollow,
            is_following: false,
        };
        const response = await createUserRelation(userRelation);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function blockUser(userId, userIdBlocked) {
    try {
        const userRelation = {
            user_id_1: userId,
            user_id_2: userIdBlocked,
            is_blocking: true,
            is_following: false,
        };
        const response = await createUserRelation(userRelation);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function unBlockUser(userId, userIdBlocked) {
    try {
        const userRelation = {
            user_id_1: userId,
            user_id_2: userIdBlocked,
            is_blocking: false,
        };
        const response = await createUserRelation(userRelation);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}
