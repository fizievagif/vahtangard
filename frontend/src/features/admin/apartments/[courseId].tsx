import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {blockStyle, blockTopStyle} from "../../../styles";
import AdminSidebar from "../../../Components/UI/AdminSidebar/AdminSidebar";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {apartmentToggleDeleted, deleteApartment, fetchOneApartment} from "../../apartments/apartmentsThunks";
import {
  selectApartmentDeleting,
  selectApartmentTogglingDeleted,
  selectOneApartment
} from "../../apartments/apartmentsSlice";
import {apiURL} from "../../../constants";

const imgStyle = {
  xs: 300,
  md: 400,
  lg: 500,
  xl: 500,
};

const marginTop = {
  xs: '10px',
  md: '20px',
  lg: '80px',
};

const CourseId = () => {
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const apartment = useAppSelector(selectOneApartment);
  const deleteLoading = useAppSelector(selectApartmentDeleting);
  const togglingDeleted = useAppSelector(selectApartmentTogglingDeleted);

  React.useEffect(() => {
    void dispatch(fetchOneApartment(id));
  }, [dispatch, id, deleteLoading]);

  const handleDelete = async () => {
    if (!apartment) return;
    if (window.confirm('Подтвердите удаление объекта')) {
      await dispatch(deleteApartment(apartment._id));
      void navigate('/admin/apartments');
    }
  };

  const toggleCourseDeleted = (id: string) => {
    dispatch(apartmentToggleDeleted(id));
  };

  const isXs = useMediaQuery('(max-width:599px)');
  const isMd = useMediaQuery('(min-width:600px) and (max-width:959px)');
  const isLg = useMediaQuery('(min-width:960px) and (max-width:1279px)');
  const isXl = useMediaQuery('(min-width:1280px)');

  return (
    <AdminSidebar>
      {apartment && (
        <Grid container direction="column" style={blockStyle}>
          <Grid container spacing={4}>
            <Grid item xs container direction="column">
              <Grid container item xs style={blockTopStyle} textAlign="center">
                <Grid item xs>
                  <Typography variant="h3">
                    {apartment.title}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Категория:</Typography>
                <Typography component="p">{apartment.category.title}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">
                  Об объекте
                </Typography>
                <Typography component="p">{apartment.description}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Степень готовности:</Typography>
                <Typography component="p">{apartment.readiness}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Кол-во комнат/квартир</Typography>
                <Typography component="p">{apartment.numberOfApartments}</Typography>
              </Grid>
            </Grid>
            <Grid item xs marginTop={marginTop}>
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
                    : undefined
                }
                height={
                  isXs
                    ? imgStyle.xs
                    : isMd
                    ? imgStyle.md
                    : isLg
                    ? imgStyle.lg
                    : isXl
                    ? imgStyle.xl
                    : undefined
                }
              />
            </Grid>
          </Grid>

          <Grid item sx={{ mt: 2, mb: 2, pl: 3 }}>
            <Typography component="div" style={{ position: 'relative' }}>
              <AccessTimeIcon
                fontSize="small"
                style={{ position: 'absolute', top: '1px', left: '5px' }}
              />

              <Typography
                component="span"
                style={{ marginLeft: '30px', fontWeight: '700' }}
              >
                Квадратура: {apartment.apartmentArea} м2
              </Typography>
            </Typography>

            <Typography component="div" style={{ position: 'relative' }}>
              <MoneyIcon
                fontSize="small"
                style={{ position: 'absolute', top: '1px', left: '5px' }}
              />
              <Typography
                component="span"
                style={{ marginLeft: '30px', fontWeight: '700' }}
              >
                Цена: {apartment.cost} $
              </Typography>
            </Typography>
          </Grid>
          <Grid item container sx={{ mb: 3 }}>
            <Grid item sx={{ ml: 3 }}>
              <Button variant="contained" color="secondary">
                Запишись сейчас!
              </Button>
            </Grid>
            <Grid item sx={{ ml: 3 }}>
              <LoadingButton
                color="error"
                variant="contained"
                loading={deleteLoading ? deleteLoading === apartment._id : false}
                disabled={togglingDeleted}
                onClick={handleDelete}
                sx={{ width: '89px' }}
              >
                <span>Удалить</span>
              </LoadingButton>
            </Grid>
            <Grid item sx={{ ml: 3 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => toggleCourseDeleted(apartment?._id)}
                disabled={togglingDeleted || deleteLoading === apartment._id}
              >
                {apartment.isDeleted ? 'Показать' : 'Скрыть'}
              </Button>
            </Grid>
            <Grid item sx={{ ml: 3 }}>
              <Button
                component={Link}
                to={`edit/${apartment._id}`}
                variant="contained"
                color="primary"
                disabled={togglingDeleted || deleteLoading === apartment._id}
              >
                Редактировать
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </AdminSidebar>
  );
};

export default CourseId;
