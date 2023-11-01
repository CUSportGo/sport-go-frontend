export interface SportArea {
  id: string;
  name: string;
  imageURL: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
  sportList: SportList[];
}

export interface SportList {
  sportType: string;
  area: AreaDetail[];
}

export interface AreaDetail {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  price: number;
}
