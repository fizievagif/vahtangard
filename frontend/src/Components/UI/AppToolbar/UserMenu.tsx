import React from 'react';
import { Avatar, Button } from '@mui/material';
import {apiURL} from "../../../constants";
import {Link} from "react-router-dom";
import {User} from "../../../types";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  let cardImage = '';

  if (user.avatar) {
    cardImage = apiURL + '/' + user.avatar;
  }

  return (
    <>
      <Button
        color="inherit"
        className="conveythis-no-translate"
        component={Link}
        to={
          user.role === 'user'
            ? '/profile'
            : '/admin/categories'
        }
      >
        {user.firstName}
        <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 1 }} />
      </Button>
    </>
  );
};

export default UserMenu;
