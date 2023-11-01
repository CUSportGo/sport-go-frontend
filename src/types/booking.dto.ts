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
