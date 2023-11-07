import axios from "axios";
import { ResetPasswordRequestDto, ResetPasswordResponseDto } from "../types/auth.dto";
import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetAvailableBookingRequest,
  GetAvailableBookingResponse,
} from "../types/booking.dto";
import { storage } from "./storage";
import { SearchSportAreaRequestDto } from "../types/sportarea.dto";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true
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
};

const getAllUser = async () => {
  const response = await client.get("/user");
  return response;
};

const banUser = async (userId: string) => {
  const response = await client.patch("admin/ban/" + userId);
  return response;
}
const unbanUser = async (userId: string) => {
  const response = await client.patch("admin/unban/" + userId);
  return response;
}

const getSportAreaByID = async (id: any) => {
  const response = await client.get("/sportArea/" + id);
  return response;
};

const getAvailableBooking = async (
  request: GetAvailableBookingRequest
): Promise<GetAvailableBookingResponse> => {
  const response = await client.post("/booking/available", request);
  return response.data;
};

const createBooking = async (request: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const response = await client.post("/booking", request);
  return response.data;
};

const searchSportArea = async (params: SearchSportAreaRequestDto) => {
  const response = await client.get("/sportArea", { params: params });
  return response;
};

const createSportArea = async (data: FormData) => {
  const response = await client.post("/sportarea", data);
  return response;
};

export const apiClient = {
  client,
  postLogin,
  postRegister,
  googleOAuth,
  resetPassword,
  postForgotPassword,
  searchSportArea,
  createSportArea,
  getAllUser,
  banUser,
  unbanUser,
  getSportAreaByID,
  getAvailableBooking,
  createBooking,
};
