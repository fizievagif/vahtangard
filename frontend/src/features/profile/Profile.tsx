import icon from '../../assets/images/user-icon.jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React  from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoginLoading, selectUser} from "../users/usersSlice";
import {apiURL} from "../../constants";
import BlocksTitle from "../../Components/UI/BlocksTitle/BlocksTitle";
import {Link} from "react-router-dom";
import MyModal from "../../Components/UI/Modal/MyModal";
import {removeUserAvatar, uploadUserAvatar} from "../users/usersThunks";

const styles = {
  userInfo: {
    mb: 2,
    fontSize: 20,
    textAlign: 'left',
  },
  userInfoText: {
    color: 'primary.main',
  },
  image: {
    margin: '0 auto',
    borderRadius: '15px',
  },
};

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const loading = useAppSelector(selectLoginLoading);

  const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById(
      'avatarInput',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!user) return;
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file, file.name);
        await dispatch(uploadUserAvatar({ avatar: formData })).unwrap();
      }
    }
  };

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const removeAvatar = async () => {
    await dispatch(removeUserAvatar());
    closeModal();
  };

  return (
    <>
      {user && (
        <div>
          <BlocksTitle titleText="Мой профиль" />
          {loading && (
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress />
            </Grid>
          )}
          <Grid
            container
            gap={3}
            textAlign="left"
            color="rgb(217, 39, 45)"
            sx={{ position: 'relative' }}
          >
            <Grid
              item
              container
              alignItems="center"
              direction="column"
              gap={2}
              xs={12}
              sm={4}
              md={3}
            >
              {user.avatar ? (
                <>
                  <img
                    style={styles.image}
                    src={apiURL + '/' + user.avatar}
                    alt={user.firstName}
                    width={200}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setOpen(true)}
                    size="small"
                  >
                    Удалить аватар
                  </Button>
                </>
              ) : (
                <>
                  <img
                    style={styles.image}
                    src={icon}
                    alt="User icon"
                    width={200}
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarInput"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="avatarInput">
                      <Button
                        onClick={handleUploadClick}
                        variant="outlined"
                        size="small"
                      >
                        Загрузить аватар
                      </Button>
                    </label>
                  </div>
                </>
              )}
            </Grid>
            <Grid item>
              <Grid>
                <Typography variant="body1" sx={styles.userInfo}>
                  ФИО:
                  <Typography component="span" sx={styles.userInfoText}>
                    {' '}
                    {user.firstName} {user.lastName}
                  </Typography>
                </Typography>

                <Typography variant="body1" sx={styles.userInfo}>
                  Email:{' '}
                  <Typography component="span" sx={styles.userInfoText}>
                    {user.email}
                  </Typography>
                </Typography>

                {user.phoneNumber ? (
                  <Typography variant="body1" sx={styles.userInfo}>
                    Телефон:{' '}
                    <Typography component="span" sx={styles.userInfoText}>
                      {user.phoneNumber}
                    </Typography>
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            <Box style={{ position: 'absolute', right: 0, top: 0 }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isMenuOpen ? 'long-menu' : undefined}
                aria-expanded={isMenuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={openMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={closeMenu}>
                <MenuItem>
                  <Link to="/edit-user">Изменить профиль</Link>
                </MenuItem>
                {!user.googleId && (
                  <MenuItem>
                    <Link to="/change-password">
                      Сменить пароль
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Grid>
        </div>
      )}
      {user && (
        <MyModal open={open} handleClose={closeModal}>
          <Typography variant="h5" component="div" textAlign="center">
            Подтвердите удаление аватарки
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 5,
            }}
          >
            <Button variant="outlined" color="error" onClick={removeAvatar}>
              Удалить
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              Отменить
            </Button>
          </Box>
        </MyModal>
      )}
    </>
  );
};

export default Profile;
