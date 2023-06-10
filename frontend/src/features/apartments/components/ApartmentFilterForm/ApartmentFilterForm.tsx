import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {ApartmentsCost, SearchApartment} from "../../../../types";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchApartments} from "../../apartmentsThunks";
import {selectCategories} from "../../../categories/categoriesSlice";

const filterState = <T extends Partial<Record<keyof T, T[keyof T]>>>(
  state: T,
) =>
  Object.entries(state).reduce<Partial<T>>((acc, [key, value]) => {
    if (Boolean(value)) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {});

const ApartmentFilterForm = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<SearchApartment>({});
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (Object.keys(state).length) {
      dispatch(fetchApartments(state));
    }
  }, [state, dispatch]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
      setState((prev) => filterState<SearchApartment>(prev));
    },
    [],
  );

  const onPriceChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({
        ...prev,
        cost: { ...prev.cost, [name]: value },
      }));
      setState((prev) => ({
        ...prev,
        cost: prev.cost && filterState<ApartmentsCost>(prev.cost),
      }));
    },
    [],
  );

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">Фильтрация</Typography>
        </Grid>

        <Grid item xs>
          <FormControl>
            <FormLabel>Степень готовности</FormLabel>
            <RadioGroup
              value={state.readiness ? state.readiness : ''}
              onChange={onChange}
              defaultValue=""
              name="readiness"
            >
              <FormControlLabel value="" control={<Radio />} label="Все" />
              <FormControlLabel
                value="in developing"
                control={<Radio />}
                label="В разработке"
              />
              <FormControlLabel
                value="started building"
                control={<Radio />}
                label="Начал строиться"
              />
              <FormControlLabel
                value="almost done"
                control={<Radio />}
                label="Скоро завершится"
              />
              <FormControlLabel
                value="done"
                control={<Radio />}
                label="Постройка завершена"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <TextField
            label="Категория"
            select
            name="category"
            value={state.category ? state.category : ''}
            onChange={onChange}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите категорию
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category._id} key={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <Typography variant="h6" mb={2}>
            Цена в сомах
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                label="От"
                value={state.cost && state.cost.$gte ? state.cost.$gte : ''}
                onChange={onPriceChange}
                name="$gte"
                type="number"
              />
            </Grid>

            <Grid item xs>
              <TextField
                label="До"
                value={state.cost && state.cost.$lte ? state.cost.$lte : ''}
                onChange={onPriceChange}
                name="$lte"
                type="number"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item spacing={1} justifyContent="start">
          <Grid item xs={6} md={12} lg={6}>
            <Button
              type="button"
              color="error"
              variant="contained"
              onClick={() => setState({})}
            >
              Сбросить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ApartmentFilterForm;
