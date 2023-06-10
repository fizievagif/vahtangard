import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import {IApartment} from "../../../../types";
import {selectCategories, selectCategoriesFetching} from "../../../categories/categoriesSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchCategories} from "../../../categories/categoriesThunks";
import FileInput from "../../../../Components/UI/FileInput/FileInput";
import {selectApartmentError, selectApartmentSubmitting} from "../../apartmentsSlice";

interface Props {
  onSubmit: (apartmentMutation: IApartment) => void;
  existingApartment?: IApartment;
  isEdit?: boolean;
}

const initialState: IApartment = {
  title: '',
  description: '',
  category: '',
  numberOfApartments: '',
  cost: '',
  apartmentArea: '',
  readiness: '',
  image: null,
};

const ApartmentForm: React.FC<Props> = ({
  onSubmit,
  isEdit,
  existingApartment = initialState,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);
  const error = useAppSelector(selectApartmentError);
  const submitting = useAppSelector(selectApartmentSubmitting);
  const [state, setState] = React.useState<IApartment>(existingApartment);
  const [formatError, setFormatError] = useState(false);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setFormatError(false);
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Заголовок"
            value={state.title}
            onChange={onChange}
            name="title"
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            label="Категория"
            select
            name="category"
            value={state.category}
            onChange={onChange}
            required
            error={Boolean(getFieldError('category'))}
            helperText={getFieldError('category')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите категорию{' '}
              {categoriesLoading && (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              )}
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category._id} key={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            label="Степень готовности"
            select
            name="readiness"
            value={state.readiness}
            onChange={onChange}
            required
            error={Boolean(getFieldError('readiness'))}
            helperText={getFieldError('readiness')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите степень готовности{' '}
            </MenuItem>
            <MenuItem value="in developing">В разработке</MenuItem>
            <MenuItem value="started building">Начал строиться</MenuItem>
            <MenuItem value="almost done">Скоро завершится</MenuItem>
            <MenuItem value="done">Постройка завершена</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Описание"
            value={state.description}
            onChange={onChange}
            name="description"
            required
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="numberOfApartments"
            label="Количество квартир в доме"
            value={state.numberOfApartments}
            onChange={onChange}
            type="number"
            name="numberOfApartments"
            error={Boolean(getFieldError('numberOfApartments'))}
            helperText={getFieldError('numberOfApartments')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="apartmentArea"
            label="Площадь дома"
            value={state.apartmentArea}
            onChange={onChange}
            name="apartmentArea"
            type="number"
            error={Boolean(getFieldError('apartmentArea'))}
            helperText={getFieldError('apartmentArea')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="cost"
            label="Цена"
            value={state.cost}
            onChange={onChange}
            name="cost"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            error={Boolean(getFieldError('cost'))}
            helperText={getFieldError('cost')}
          />
        </Grid>

        {formatError && (
          <Grid item xs>
            <Alert severity="error">
              Выберите хотя бы одни аппартаменты!
            </Alert>
          </Grid>
        )}
        <Grid item xs>
          <FileInput
            label="Выберите картинку для аппартамента c примерным разрешением 2048 х 562"
            onChange={onFileChange}
            name="image"
            type="image/*"
            errorCheck={getFieldError}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={submitting}
            disabled={submitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEdit ? 'Сохранить' : 'Отправить'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ApartmentForm;
