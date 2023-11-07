export interface GetAvailableBookingRequest {
  sportAreaId: string;
  sportType: string;
  areaId: string;
  bookingDate: string;
}

export interface GetAvailableBookingResponse {
  listAvailableTime: BookingTimeSlot[];
}

export interface BookingTimeSlot {
  startTime: string;
  endTime: string;
}

export interface CreateBookingRequest {
  sportAreaID: string;
  sportType: string;
  areaID: string;
  startAt: string;
  endAt: string;
}

export interface CreateBookingResponse {
  isSuccess: boolean;
}

export interface CreateSportareaRequest {
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
}

export interface CreateSportareaResponse {
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
}
