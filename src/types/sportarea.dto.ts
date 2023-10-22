export interface SearchSportAreaRequestDto {
    type: string[];
    location: string;
    latitude: number;
    longitude: number;
    maxDistance: number;
    date: string;
    startTime: string;
    endTime: string;
}

export interface SportArea {
    id: string;
    name: string;
    imageURL: string;
    sportType: string[];
    location: string;
    description: string;
    distance: number;
    price: string;
    sportList: SportList[];
  }
  
  export interface SportList {
    sportType: string;
    area: SportDetail[];
  }
  
  export interface SportDetail {
    name: string;
    openTime: string;
    closeTime: string;
    price: string;
  }