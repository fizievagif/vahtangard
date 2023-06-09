import React from 'react';
import {
  selectCategories,
  selectCategoriesCount,
  selectCategoriesPage,
  selectCategoryDeleting,
  selectCategoryTogglingDeleted,
} from '../../categoriesSlice';

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useDebounce from "../../../../hooks/useDebounce";
import SearchBar from "../../../../Components/UI/SearchBar/SearchBar";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {categoryToggleDeleted, fetchCategories, removeCategory} from "../../categoriesThunks";

const CategoryAdmin = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const currentPage = useAppSelector(selectCategoriesPage);
  const totalCount = useAppSelector(selectCategoriesCount);
  const deleting = useAppSelector(selectCategoryDeleting);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const togglingDeleted = useAppSelector(selectCategoryTogglingDeleted);
  const debouncedSearch = useDebounce(
    (value) => dispatch(fetchCategories(value)),
    500,
  );

  React.useEffect(() => {
    void dispatch(fetchCategories({ page, limit }));
  }, [dispatch, deleting, page, limit]);

  const deleteCategory = async (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить категорию?')) {
      const result = await dispatch(removeCategory(id));
      if (result.meta.requestStatus === 'rejected') {
        window.alert(
          'Категория не может быть удалена, так как у нее есть связанные аппартаменты',
        );
      }
    }
  };

  const toggleCategoryDeleted = async (id: string) => {
    dispatch(categoryToggleDeleted(id));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSearch({ [name]: value });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <SearchBar name="title" onChange={onTitleChange} />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название категории</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
              <TableCell>Скрыть / Показать</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id} hover>
                <TableCell>{category.title}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => console.log('Edited!')}
                    disabled={deleting === category._id || togglingDeleted}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => deleteCategory(category._id)}
                    disabled={deleting === category._id || togglingDeleted}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    disabled={deleting === category._id || togglingDeleted}
                    onClick={() => toggleCategoryDeleted(category._id)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {category.isDeleted ? 'Скрыта' : 'Активна'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={totalCount}
                rowsPerPage={limit}
                page={currentPage - 1}
                onPageChange={(_, newPage) => setPage(newPage + 1)}
                onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoryAdmin;
