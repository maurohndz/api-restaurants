export interface UpdateRestaurantDto {
  id?: string;
  email: string;
  name: string;
  description: string;
  address: string;
  schedule?: string[];
  images?: string[];
  phone?: string[];
  type_food?: string[];
}
