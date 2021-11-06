import Cookies from 'universal-cookie';
const cookies = new Cookies();

/**
 * Get the current credential stored in cookie
 */ 
export const getLocalCredential = () => {
    return cookies.get("local_credential");
}

export const setCredential = (credential) => {
    cookies.set("local_credential", credential)
}

export const getCurrentUser = () => {
    return getLocalCredential()?.user_id;
}

export const getRole = () => {
    return getLocalCredential()?.is_admin;
}

export const removeLocalCredential = () => {
    cookies.remove("local_credential")
}