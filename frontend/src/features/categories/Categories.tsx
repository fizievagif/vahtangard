import { Grid } from '@mui/material';
import React, {useEffect} from 'react';
import BlocksTitle from "../../Components/UI/BlocksTitle/BlocksTitle";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "./categoriesSlice";
import CategoryItem from "./components/CategoryItem/CategoryItem";
import {fetchCategories} from "./categoriesThunks";

const Index: React.FC = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <BlocksTitle titleText="Список всех категорий" />
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
