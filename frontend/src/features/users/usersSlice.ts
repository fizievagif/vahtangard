import {GlobalError, User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {
  changePassword,
  googleLogin,
  login,
  register,
  removeUserAvatar,
  updateUser,
  uploadUserAvatar
} from "./usersThunks";

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null
  logoutLoading: boolean;
  updateUserLoading: false | string;
  updateUserError: ValidationError | null;
  passwordChanging: boolean;
  passwordChangeError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  updateUserLoading: false,
  updateUserError: null,
  passwordChanging: false,
  passwordChangeError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerError = null;
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    })
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginError = null;
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    })
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.registerLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.updateUserError = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload: user }) => {
      state.user = user;
    });
    builder.addCase(updateUser.rejected, (state, { payload: error }) => {
      state.updateUserError = error || null;
    });

    builder.addCase(changePassword.pending, (state) => {
      state.passwordChangeError = null;
      state.passwordChanging = true;
    });
    builder.addCase(changePassword.fulfilled, (state, { payload: user }) => {
      state.passwordChangeError = null;
      state.passwordChanging = false;
      state.user = user;
    });
    builder.addCase(changePassword.rejected, (state, { payload: error }) => {
      state.passwordChanging = false;
      state.passwordChangeError = error || null;
    });

    builder.addCase(removeUserAvatar.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(removeUserAvatar.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(removeUserAvatar.rejected, (state) => {
      state.loginLoading = false;
    });

    builder.addCase(uploadUserAvatar.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(uploadUserAvatar.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(uploadUserAvatar.rejected, (state) => {
      state.loginLoading = false;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectUpdateUserError = (state: RootState) => state.users.updateUserError;
export const selectPasswordChanging = (state: RootState) => state.users.passwordChanging;
export const selectPasswordChangeError = (state: RootState) => state.users.passwordChangeError;
