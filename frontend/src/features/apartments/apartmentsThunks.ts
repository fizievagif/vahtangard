import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from "../../axiosApi";
import {
  ApiResponse,
  GlobalError,
  PageLimit,
  ValidationError,
  SearchApartment,
  IApartment,
  ApartmentShort, ApiApartment
} from "../../types";

type SearchParam = SearchApartment & PageLimit;

export const fetchApartments = createAsyncThunk<
  ApiResponse<ApartmentShort>,
  SearchParam | undefined
>('apartments/fetchAll', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApartmentShort>>('/apartments', {
    params,
  });
  return data;
});

export const fetchOneApartment = createAsyncThunk<ApiApartment, string>(
  'apartments/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/apartments/' + id);
    return response.data;
  },
);

export const createApartment = createAsyncThunk<
  void,
  IApartment,
  { rejectValue: ValidationError }
>('apartments/create', async (apartmentMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(apartmentMutation) as (keyof IApartment)[];

    keys.forEach((key) => {
      const value = apartmentMutation[key];

      if (value !== null) {
        if (typeof value === 'boolean') {
          formData.append(key, String(value)); // Convert boolean to string
        } else {
          formData.append(key, value);
        }
      }
    });

    await axiosApi.post('/apartments', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface UpdateApartmentsParams {
  id: string;
  apartment: IApartment;
}

export const updateApartment = createAsyncThunk<
  void,
  UpdateApartmentsParams,
  { rejectValue: ValidationError }
>('apartments/update', async ({ id, apartment }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(apartment) as (keyof IApartment)[];

    keys.forEach((key) => {
      const value = apartment[key];

      if (value !== null) {
        if (typeof value === 'boolean') {
          formData.append(key, String(value)); // Convert boolean to string
        } else {
          formData.append(key, value);
        }
      }
    });

    await axiosApi.put(`/apartments/${id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteApartment = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('apartments/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete('/apartments/' + id);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const apartmentToggleDeleted = createAsyncThunk<void, string>(
  'apartments/toggleIsDeleted',
  async (id) => {
    await axiosApi.patch(`/apartments/${id}/toggleIsDeleted`);
  },
);
