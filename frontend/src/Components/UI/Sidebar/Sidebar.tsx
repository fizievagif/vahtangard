import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const openClickPage = (name: string) => {
    navigate('/admin/' + name);
  };

  return (
    <>
      <Box sx={{ width: '240px' }}>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('apartments')}>
              <ListItemText primary="Аппартаменты" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('categories')}>
              <ListItemText primary="Категории" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </>
  );
};

export default Sidebar;
