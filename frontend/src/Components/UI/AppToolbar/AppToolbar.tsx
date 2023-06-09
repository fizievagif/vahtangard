import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import {selectUser} from "../../../features/users/usersSlice";
import {Link} from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: 'Объекты', href: '/apartments' },
  { name: 'Страница контактов', href: '/contacts' },
];

const AppToolbar: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Меню
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Button component={Link} to="/about" color="inherit">
            О компании
          </Button>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Button component={Link} to={item.href} color="inherit">
                {item.name}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>{user ? null : <AnonymousMenu />}</ListItem>
        <Divider />
        <ListItem sx={{ textAlign: 'center' }}>
          <Button component={Link} to="/categories" color="inherit">
            Категории объектов
          </Button>
        </ListItem>
        {user && user.role === 'admin' ? (
          <ListItem>
            <Button component={Link} to="/admin/courses" color="inherit">
              Админ панель
            </Button>
          </ListItem>
        ) : null}
        {user ? (
          <Box>
            <ListItem>
              <Button component={Link} to="/profile" color="inherit">
                Личный кабинет
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={handleLogout} color="inherit">
                Выйти
              </Button>
            </ListItem>
          </Box>
        ) : null}
      </List>
    </Box>
  );

  const containerDiv =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={3} sm={5} md={4}>
            <Typography component="div">
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="span"
                  style={{
                    textTransform: 'uppercase',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                  display={{ xs: 'none', sm: 'inline' }}
                  className="conveythis-no-translate"
                >
                  Vahtangard
                </Typography>
                <Box
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                    background: '#fff',
                  }}
                >
                </Box>
              </Link>
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-end"
            xs={9}
            sm={7}
            md={8}
          >
            {user ? (
              <UserMenu user={user}/>
            ) : null}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box component="nav">
          <Drawer
            disableScrollLock={true}
            container={containerDiv}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
