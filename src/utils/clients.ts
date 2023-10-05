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

const googleOAuth = async () => {
  const response = await client.get("/auth/google");
  return response;
};

const postRegister = async (data: object) => {
    const response = await client.post("/auth/register", data);
    return response;
}

export const apiClient = {
    client,
    postLogin,
    postRegister,
    googleOAuth,
}
