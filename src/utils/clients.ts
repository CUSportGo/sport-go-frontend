import axios from "axios";
import { ResetPasswordRequestDto, ResetPasswordResponseDto } from "../types/auth.dto";
import { storage } from "./storage";
import { SearchSportAreaRequestDto } from "../types/sportarea.dto";


const client = axios.create({
  baseURL: process.env.BASEURL,
});

const AccountClient = axios.create({
  baseURL: process.env.ACCOUNTURL,
});

const postLogin = async (data: object) => {
  const response = await client.post("/auth/login", data)
  return response;
};

const googleOAuth = async () => {
  const response = await client.get("/auth/google");
  return response;
};

const postRegister = async (data: object) => {
  const response = await client.post("/auth/register", data);
  return response;
};

const resetPassword = async (request: ResetPasswordRequestDto) => {
  const response = await client.put("/auth/resetPassword", request);
  return response.data;
};

const postForgotPassword = async (data: object) => {
  const response = await client.post("/auth/forgotPassword", data);
  return response;
}

const getAllUser = async () => {
  const response = await client.get("/user");
  return response;
};

const banUser = async (userId: string) => {
  const response = await AccountClient.get("/ban/" + userId);
  return response;
}
const unbanUser = async (userId: string) => {
  const response = await AccountClient.get("/unban/" + userId);
  return response;
}

const searchSportArea = async (params: SearchSportAreaRequestDto) => {
  const response = await client.get("/sportArea", { params: params });
  return response;
}

export const apiClient = {
  client,
  postLogin,
  postRegister,
  googleOAuth,
  resetPassword,
  postForgotPassword,
  getAllUser,
  banUser,
  unbanUser,
  searchSportArea
};
