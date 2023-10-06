import axios from "axios";
import { storage } from "./storage";

const client = axios.create({
    baseURL: 'http://localhost:8080',
});

const postLogin = async (data: object) => {
    const response = await client.post("/auth/login", data);
    storage.setAccessToken(response.data.credential.accessToken);
    return response;
};

const postForgotPassword = async (data: object) => {
    const response = await client.post("/auth/forgotPassword", data);
    return response;
}
export const apiClient = {
    client,
    postForgotPassword,
    postLogin
}