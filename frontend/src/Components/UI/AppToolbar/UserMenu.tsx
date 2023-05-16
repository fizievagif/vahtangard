import React, {useState} from 'react';
import {User} from '../../../types';
import {Avatar, Button, IconButton, Menu, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import LoadingButton from '@mui/lab/LoadingButton';
import {selectLogoutLoading} from "../../../features/users/usersSlice";
import {logout} from "../../../features/users/usersThunks";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLogoutLoading);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const avatar = 'http://localhost:8000/';
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        {user.firstName} {user.lastName}
      </Button>

      <IconButton sx={{p: 0}}>

      <Avatar alt={user.lastName} src={avatar + user.avatar}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        {loading ?
          <LoadingButton
            size="small"
            color="secondary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            variant="contained"
          >
            <span>Logout</span>
          </LoadingButton>
          :
          <MenuItem onClick={handleLogout}>Logout</MenuItem>}
      </Menu>
    </>
  );
};

export default UserMenu;