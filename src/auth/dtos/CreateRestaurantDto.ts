export interface CreateRestaurantDto {
  id?: string;
  email: string;
  name: string;
  description: string;
  address: string;
  schedule?: string[];
  images?: string[];
  phone?: string[];
  type_food?: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  password: string;
}
