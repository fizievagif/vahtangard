import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Avatar, Box, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice";
import {googleLogin, register} from "./usersThunks";
import FileInput from "../../Components/UI/FileInput/FileInput";
import {GoogleLogin} from "@react-oauth/google";
import LoadingButton from "@mui/lab/LoadingButton";

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    avatar: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({...prevState, [name]: value}))
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      // error happened
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  const phoneNumberPattern = '^+996\\d{9}$';

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => console.log('Login failed')}
          />
        </Box>

        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                label="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                label="Имя"
                name="firstName"
                autoComplete="new-firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('firstName'))}
                helperText={getFieldError('firstName')}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                label="Фамилия"
                name="lastName"
                autoComplete="new-lastName"
                value={state.lastName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('lastName'))}
                helperText={getFieldError('lastName')}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Телефон +996 ХХХ ХХХ ХХХ"
                name="phoneNumber"
                autoComplete="new-phoneNumber"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('phoneNumber'))}
                helperText={getFieldError('phoneNumber')}
                inputProps={{ pattern: phoneNumberPattern }}
                type="tel"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                name="password"
                label="Пароль"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12}>
              <FileInput
                label="Avatar"
                onChange={fileInputChangeHandler}
                name="image"
                type="image/*"
              />
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Завершить регистрацию
          </LoadingButton>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Войти используя email и пароль
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;