import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  User,
  ValidationError, RegisterResponse, UpdateUserMutation, IChangePassword, ApiResponse,
} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {unsetUser} from "./usersSlice";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

      keys.forEach(key => {
        const value = registerMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post<RegisterResponse>('/users', formData);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
    );
    const { user } = data;

    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
export const logout = createAsyncThunk(
  "users/logout",
  async (_, {dispatch}) => {
    await axiosApi.delete('users/sessions');
    dispatch(unsetUser());
  }
);

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
  >('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<RegisterResponse>('/users/google', {
      credential,
    });
    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

interface UpdateUserParams {
  user: UpdateUserMutation;
}

export const updateUser = createAsyncThunk<
  User,
  UpdateUserParams,
  { rejectValue: ValidationError }
>('users/update', async (params, { rejectWithValue }) => {
  const formData = new FormData();

  const keys = Object.keys(params.user) as (keyof UpdateUserMutation)[];

  keys.forEach((key) => {
    const value = params.user[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });
  try {
    const response = await axiosApi.patch('/users', formData);
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const changePassword = createAsyncThunk<
  User,
  IChangePassword,
  { rejectValue: GlobalError }
>('users/changePassword', async (passwords, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<ApiResponse<User>>(
      '/users/change-password',
      passwords,
    );
    return data.result as User;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

export const removeUserAvatar = createAsyncThunk<User>(
  'user/removeAvatar',
  async () => {
    const { data } = await axiosApi.patch<RegisterResponse>(
      `users/remove-avatar`,
    );
    return data.user;
  },
);
export const uploadUserAvatar = createAsyncThunk<
  User,
  { avatar: FormData },
  { rejectValue: GlobalError }
>('user/sendAvatar', async ({ avatar }, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.patch<RegisterResponse>(
      `/users/add-avatar`,
      avatar,
    );

    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});