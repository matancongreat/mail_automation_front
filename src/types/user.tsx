export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserDto {
  email?: string;
  username?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}