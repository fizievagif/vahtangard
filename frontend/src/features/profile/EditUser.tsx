import { Grid } from '@mui/material';
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {UpdateUserMutation} from "../../types";
import {updateUser} from "../users/usersThunks";
import {selectUser} from "../users/usersSlice";
import EditUserForm from "./Components/EditUserForm";
import {useNavigate} from "react-router-dom";

const EditUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmit = async (userMutation: UpdateUserMutation) => {
    await dispatch(updateUser({ user: userMutation })).unwrap();
    navigate('/profile')
  };

  const existingUser = user && {
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    avatar: null,
  };

  return (
    <Grid>
      {existingUser && (
        <EditUserForm onSubmit={onSubmit} existingUser={existingUser} />
      )}
    </Grid>
  );
};

export default EditUser;
