import axios from "axios";
import { ResetPasswordRequestDto, ResetPasswordResponseDto } from "../types/auth.dto";
import { storage } from "./storage";
import { SearchSportAreaRequestDto } from "../types/sportarea.dto";


const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const postLogin = async (data: object) => {
  const response = await client.post("/auth/login", data);
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

const getSportAreaByID = async (id: any) => {
  const response = await client.get("/sportArea/" + id);
  return response;
};

const searchSportArea = async (params: SearchSportAreaRequestDto) => {
  const response = await client.get("/sportArea", {params: params});
  return response;
}

export const apiClient = {
  client,
  postLogin,
  postRegister,
  googleOAuth,
  resetPassword,
  postForgotPassword,
  getSportAreaByID,
  searchSportArea
};
