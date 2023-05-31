export interface Restaurant {
  id: string;
  email: string;
  name: string;
  description: string;
  address: string;
  schedule: string;
  image?: string;
  phone: string;
  type_food: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
