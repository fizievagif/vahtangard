import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import {
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, {useEffect} from 'react';
import {selectOneApartment, selectOneApartmentsFetching} from "./apartmentsSlice";
import {fetchOneApartment} from "./apartmentsThunks";
import {apiURL} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {blockStyle, blockTopStyle} from "../../styles";
import {useParams} from "react-router-dom";

const imgStyle = {
  xs: 250,
  md: 400,
  lg: 500,
  xl: 700,
};

const imgStyleHeight = {
  xs: 120,
  md: 200,
  lg: 270,
  xl: 330,
};

const marginTop = {
  xs: '10px',
  md: '20px',
  lg: '80px',
};

const CourseId: React.FC = () => {
  const dispatch = useAppDispatch();
  const apartment = useAppSelector(selectOneApartment);
  const apartmentLoading = useAppSelector(selectOneApartmentsFetching);
  const { id } = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchOneApartment(id));
  }, [dispatch]);

  const isXs = useMediaQuery('(max-width:600px)');
  const isMd = useMediaQuery('(min-width:600px) and (max-width:959px)');
  const isLg = useMediaQuery('(min-width:960px) and (max-width:1279px)');
  const isXl = useMediaQuery('(min-width:1280px)');

  return (
    <>
      {apartmentLoading ? (
        <CircularProgress />
      ) : (
        apartment && (
          <Grid container style={blockStyle}>
            <Grid container sx={{ padding: '20px' }}>
              <Grid item xs container direction="column" padding="20px">
                <Grid container item xs style={blockTopStyle}>
                  <Grid item xs>
                    <Typography
                      variant="h3"
                      fontSize={{ xs: '2rem', sm: '2.5rem', lg: '3rem' }}
                    >
                      {apartment.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Категория:</Typography>
                  <Typography component="p">{apartment.category.title}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Степень готовности:</Typography>
                  <Typography component="p">{apartment.readiness}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    Об объекте
                  </Typography>
                  <Typography component="p">{apartment.description}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">{
                    apartment.category.title === 'Высокоэтажные дома'
                      ?
                      'Сколько квартир?'
                      :
                      'Сколько комнат?'
                  }</Typography>
                  <Typography component="p">{apartment.numberOfApartments}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                marginTop={marginTop}
              >
                <img
                  style={{ margin: '0 auto', borderRadius: '10%' }}
                  src={apiURL + '/' + apartment.image}
                  alt={apartment.title}
                  width={
                    isXs
                      ? imgStyle.xs
                      : isMd
                        ? imgStyle.md
                        : isLg
                          ? imgStyle.lg
                          : isXl
                            ? imgStyle.xl
                            : 100
                  }
                  height={
                    isXs
                      ? imgStyleHeight.xs
                      : isMd
                        ? imgStyleHeight.md
                        : isLg
                          ? imgStyleHeight.lg
                          : isXl
                            ? imgStyleHeight.xl
                            : 10
                  }
                />
              </Grid>
            </Grid>

            <Grid item sx={{ my: 2, padding: '20px' }}>
              <Typography
                component="div"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <AccessTimeIcon fontSize="small" />

                <Typography
                  component="span"
                  style={{ marginLeft: '20px', fontWeight: '700' }}
                >
                  Квадратура: {apartment.apartmentArea} м2
                </Typography>
              </Typography>

              <Typography
                component="div"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <MoneyIcon fontSize="small" />
                <Typography
                  component="span"
                  style={{ marginLeft: '20px', fontWeight: '700' }}
                >
                  Цена: {apartment.cost} $
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default CourseId;
