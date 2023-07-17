export interface CreateEmployeeDto {
  restaurant_id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  rol_id?: string | null;
}
