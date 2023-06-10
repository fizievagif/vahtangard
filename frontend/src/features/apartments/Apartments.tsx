import { Alert, Box, Grid } from '@mui/material';
import React, {useEffect} from 'react';
import {selectApartments} from "./apartmentsSlice";
import {fetchCategories} from "../categories/categoriesThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import ApartmentFilterForm from "./components/ApartmentFilterForm/ApartmentFilterForm";
import ApartmentCard from "./components/ApartmentCard/ApartmentCard";
import {fetchApartments} from "./apartmentsThunks";

const Apartments: React.FC = () => {
  const fullApartments = useAppSelector(selectApartments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApartments());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <ApartmentFilterForm />
        </Grid>
        <Grid item xs={12} md={9} container spacing={3}>
          {fullApartments.length > 0 ? (
            fullApartments.map((apartment) => (
              <Grid item xs={12} key={apartment._id}>
                <ApartmentCard key={apartment._id} apartment={apartment} />
              </Grid>
            ))
          ) : (
            <Box mt={3}>
              <Alert severity="warning">
                Здесь пока нету объектов по таким параметрам!
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Apartments;
