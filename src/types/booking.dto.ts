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

export interface Booking {
  id: string;
  sportAreaID: string;
  sportType: string;
  areaID: string;
  userID: string;
  startAt: string;
  endAt: string;
  status: number;
  sportAreaData: {
    id: string;
    name: string;
    description: string;
    image: String[];
  };
  areaName: "string";
}

export interface BookingHistory {
  pending: {
    id: string;
    sportAreaID: string;
    sportType: string;
    areaID: string;
    userID: string;
    startAt: string;
    endAt: string;
    status: number;
    sportAreaData: {
      id: string;
      name: string;
      desciption: string;
      image: string[];
    };
    areaName: string;
  }[];
  accept: {
    id: string;
    sportAreaID: string;
    sportType: string;
    areaID: string;
    userID: string;
    startAt: string;
    endAt: string;
    status: number;
    sportAreaData: {
      id: string;
      name: string;
      desciption: string;
      image: string[];
    };
    areaName: string;
  }[];
  decline: {
    id: string;
    sportAreaID: string;
    sportType: string;
    areaID: string;
    userID: string;
    startAt: string;
    endAt: string;
    status: number;
    sportAreaData: {
      id: string;
      name: string;
      desciption: string;
      image: string[];
    };
    areaName: string;
  }[];
  cancel: {
    id: string;
    sportAreaID: string;
    sportType: string;
    areaID: string;
    userID: string;
    startAt: string;
    endAt: string;
    status: number;
    sportAreaData: {
      id: string;
      name: string;
      desciption: string;
      image: string[];
    };
    areaName: string;
  }[];
}
