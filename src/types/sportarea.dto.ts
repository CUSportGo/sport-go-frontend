export interface SportAreaResponseDto {
  id: string;
  name: string;
  image?: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  description: string;
  price: string;
  sportList?: SportList[];
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
