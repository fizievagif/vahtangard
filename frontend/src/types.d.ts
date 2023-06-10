export interface RegisterMutation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
  phoneNumber: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  token: string;
  role: UserRole;
  avatar: string | null;
  googleId?: string;
}

export interface RegisterResponse {
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
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface ApiCategory {
  _id: string;
  title: string;
  description: string;
  image: string;
  isDeleted: boolean;
}

export interface ApiResponse<Type> {
  message: 'string';
  result: Type | IPagination<Type>;
}

export interface IPagination<Type> {
  [key: string]: Type[];
  currentPage: number;
  totalCount: number;
}

export interface ICategory {
  title: string;
  description: string;
  image: File | null;
}

export interface PageLimit {
  page?: number;
  limit?: number;
}

export type UpdateUserMutation = Pick<
  RegisterMutation,
  'email' | 'phoneNumber' | 'lastName' | 'firstName' | 'avatar'
>;

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IApartment {
  title: string;
  cost: string;
  description: string;
  category: string;
  numberOfApartments: string;
  apartmentArea: string;
  readiness: string;

  image: File | null;
}

export interface ApiApartment {
  _id: string;
  title: string;
  image: string;
  cost: number;
  description: string;
  numberOfApartments: number;
  category: Pick<ApiCategory, '_id' | 'title'>;
  readiness: string;
  apartmentArea: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ApartmentShort = Pick<
  ApiApartment,
  '_id' | 'title' | 'numberOfApartments' | 'image' | 'isDeleted' | 'cost'
>;

export interface ApartmentsCost {
  $gte?: number;
  $lte?: number;
}

export type SearchApartment = Partial<
  Omit<ICourse, 'numberOfApartment' | 'cost' | 'image'> & {
  cost: ApartmentsCost;
}>;
