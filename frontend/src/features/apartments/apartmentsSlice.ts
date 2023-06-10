import { createSlice } from '@reduxjs/toolkit';
import {
  ApartmentShort,
  ApiApartment,
  GlobalError,
  IPagination,
  ValidationError
} from "../../types";
import {
  apartmentToggleDeleted,
  createApartment,
  deleteApartment,
  fetchApartments,
  fetchOneApartment, updateApartment
} from "./apartmentsThunks";
import {RootState} from "../../app/store";

interface CourseState {
  items: ApartmentShort[];
  fetchLoading: boolean;
  oneApartment: ApiApartment | null;
  fetchOneLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
  removeError: GlobalError | null;
  togglingIsDeleted: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: CourseState = {
  items: [],
  fetchLoading: false,
  oneApartment: null,
  fetchOneLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false,
  removeError: null,
  togglingIsDeleted: false,
  currentPage: 1,
  totalCount: 1,
};

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApartments.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchApartments.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<ApartmentShort>;
      state.items = result.apartments;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchApartments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneApartment.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneApartment.fulfilled, (state, { payload: apartment }) => {
      state.fetchOneLoading = false;
      state.oneApartment = apartment;
    });
    builder.addCase(fetchOneApartment.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createApartment.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createApartment.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createApartment.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(updateApartment.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(updateApartment.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(updateApartment.rejected, (state, { payload: error }) => {
      state.submitting = false;
      state.error = error || null;
    });

    builder.addCase(deleteApartment.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteApartment.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteApartment.rejected, (state, { payload: error }) => {
      state.removeError = error || null;
      state.deleteLoading = false;
    });
    builder.addCase(apartmentToggleDeleted.pending, (state) => {
      state.togglingIsDeleted = true;
    });
    builder.addCase(apartmentToggleDeleted.fulfilled, (state) => {
      state.togglingIsDeleted = false;
    });
    builder.addCase(apartmentToggleDeleted.rejected, (state) => {
      state.togglingIsDeleted = false;
    });
  },
});

export const apartmentsReducer = apartmentsSlice.reducer;
export const { cleanError } = apartmentsSlice.actions;
export const selectApartments = (state: RootState) => state.apartments.items;
export const selectApartmentsFetching = (state: RootState) =>
  state.apartments.fetchLoading;
export const selectOneApartment = (state: RootState) => state.apartments.oneApartment;
export const selectOneApartmentsFetching = (state: RootState) =>
  state.apartments.fetchOneLoading;
export const selectApartmentSubmitting = (state: RootState) =>
  state.apartments.submitting;
export const selectApartmentError = (state: RootState) => state.apartments.error;
export const selectApartmentDeleting = (state: RootState) =>
  state.apartments.deleteLoading;
export const selectApartmentPage = (state: RootState) => state.apartments.currentPage;
export const selectApartmentsCount = (state: RootState) =>
  state.apartments.totalCount;
export const selectApartmentTogglingDeleted = (state: RootState) =>
  state.apartments.togglingIsDeleted;
