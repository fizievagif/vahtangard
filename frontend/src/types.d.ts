export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: string | null
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  role: string;
  token: string;
}

export interface UserResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}