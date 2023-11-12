import axios from "axios";
import { ResetPasswordRequestDto, ResetPasswordResponseDto } from "../types/auth.dto";
import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetAvailableBookingRequest,
  GetAvailableBookingResponse,
} from "../types/booking.dto";
import { storage } from "./storage";
import { AddSportAreaRequest, AddSportAreaResponse, SearchSportAreaRequestDto } from "../types/sportarea.dto";


export const client = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true
});

const refreshToken = async () => {
  try {
    const resp = await client.post("auth/refreshToken").then((res) => {
    });
    return resp
  } catch (e) {
    console.log("Error", e);
  }
};

let isRefreshing = false;
let refreshQueue = [];

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await refreshToken();
          const originalRequest = error.config;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((newAccessToken) => {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        });
      }
    }

    return Promise.reject(error);
  }
);

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
}

const addSportArea = async (id :string,data: AddSportAreaRequest) : Promise<AddSportAreaResponse> => {
  const response = await client.patch("/sportArea/"+id+"/area", data);
  return response;
}

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
  getSportAreaByID,
  getAllUser,
  banUser,
  unbanUser,
  getAvailableBooking,
  createBooking,
  addSportArea,
};
