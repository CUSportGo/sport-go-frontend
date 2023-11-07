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
