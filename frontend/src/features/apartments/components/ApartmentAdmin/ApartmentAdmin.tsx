import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Link as MUILink,
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  selectApartmentDeleting,
  selectApartmentPage,
  selectApartments,
  selectApartmentsCount, selectApartmentTogglingDeleted
} from "../../apartmentsSlice";
import SearchBar from "../../../../Components/UI/SearchBar/SearchBar";
import useDebounce from "../../../../hooks/useDebounce";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {apartmentToggleDeleted, deleteApartment, fetchApartments} from "../../apartmentsThunks";
import {Link} from "react-router-dom";

const ApartmentAdmin = () => {
  const dispatch = useAppDispatch();
  const apartments = useAppSelector(selectApartments);
  const deleteLoading = useAppSelector(selectApartmentDeleting);
  const totalCount = useAppSelector(selectApartmentsCount);
  const currentPage = useAppSelector(selectApartmentPage);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const togglingDeleted = useAppSelector(selectApartmentTogglingDeleted);
  const debouncedSearch = useDebounce(
    (value) => dispatch(fetchApartments(value)),
    500,
  );

  React.useEffect(() => {
    void dispatch(fetchApartments({ page, limit }));
  }, [dispatch, deleteLoading, page, limit]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление курса')) {
      await dispatch(deleteApartment(id));
    }
  };

  const toggleCourseDeleted = async (id: string) => {
    await dispatch(apartmentToggleDeleted(id));
    await dispatch(fetchApartments({ page, limit }));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSearch({ [name]: value, page, limit });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <SearchBar name="title" onChange={onTitleChange} />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название объекта</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
              <TableCell>Скрыть / Показать</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map((apartment) => (
              <TableRow key={apartment._id} hover>
                <TableCell>
                  <MUILink component={Link} to={`apartments/${apartment._id}`}>
                    {apartment.title}
                  </MUILink>
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`apartments/edit/${apartment._id}`}
                    disabled={deleteLoading === apartment._id || togglingDeleted}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    disabled={deleteLoading === apartment._id || togglingDeleted}
                    onClick={() => handleDelete(apartment._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    disabled={deleteLoading === apartment._id || togglingDeleted}
                    onClick={() => toggleCourseDeleted(apartment._id)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{apartment.isDeleted ? 'Скрыт' : 'Активен'}</TableCell>
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

export default ApartmentAdmin;
