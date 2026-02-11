export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
  isAdmin?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  isAdmin?: boolean;
}
