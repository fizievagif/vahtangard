export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  phoneNumber: string;
  role: string;
  avatar: string | null;
  googleId: string | null;
}

export interface ICategory {
  title: string;
  description: string;
  image: string | null;
}

export interface IApartment {
  title: string;
  cost: number;
  description: string;
  category: string;
  numberOfApartments: number;
  apartmentArea: number;
  readiness: string;

  image: string;
  isDeleted: boolean;
}

export interface PageLimit {
  page?: string;
  limit?: string;
}

export type SwitchToString<Type> = {
  [Property in keyof Type]?: string;
};

export type SearchParam = {
  [field: string]: string | { $regex: string; $options?: string };
};

export type Search<T> = {
  [P in keyof T]?:
  | string
  | ({ $regex: string; $options?: string } & {
  $gte?: number;
  $lte?: number;
});
};