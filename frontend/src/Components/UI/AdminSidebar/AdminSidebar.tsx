import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import {Link} from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../../features/users/usersSlice";

interface Props extends React.PropsWithChildren {
  pageTitle?: string;
  createLink?: string;
}

const AdminLayout: React.FC<Props> = ({ pageTitle, createLink, children }) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <ProtectedRoute isAllowed={user && user.role === 'admin'}>
        <Grid container spacing={4} sx={{ marginTop: '40px' }}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <Grid container spacing={2} direction="column">
              <Grid item xs container justifyContent="space-between">
                {pageTitle && (
                  <Grid item>
                    <Typography variant="h4">{pageTitle}</Typography>
                  </Grid>
                )}
                {createLink && (
                  <Grid item>
                    <Button
                      component={Link}
                      to={createLink}
                      variant="contained"
                      color="primary"
                    >
                      Создать
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid item>{children}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </ProtectedRoute>
    </>
  );
};

export default AdminLayout;
