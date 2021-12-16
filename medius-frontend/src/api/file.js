import API from "./api";

export function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
} 

export async function uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);

    const response = await API.post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response?.data;
}

