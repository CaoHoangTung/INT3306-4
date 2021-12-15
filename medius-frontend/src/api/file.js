import API from "./api";

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

