import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import Sidebars from '../../pages/Sidebars'
import Headers from '../../pages/Headers/index'
import styles from './style.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteDocuments, fetchListDocuments } from '../../reducers/documents';
import _ from 'lodash';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'owner',
        numeric: false,
        disablePadding: false,
        label: 'Owner',
    },
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
    },
    {
        id: 'size',
        numeric: true,
        disablePadding: false,
        label: 'Size',
    },
    {
        id: 'dateModified',
        numeric: true,
        disablePadding: false,
        label: 'Modified',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all documents',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, handleDelete, handleRename, handleMove, ...other } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 2, sm: 2 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Storage
                </Typography>
            )}

            <Sidebars />
            {numSelected < 2 && numSelected > 0 ? (
                <Tooltip title="Rename">
                    <span>
                        <IconButton onClick={(event) => handleRename(event)}>
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            ) : (
                <Tooltip title="Rename">
                    <span>
                        <IconButton disabled>
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Move">
                        <span>
                            <IconButton onClick={(event) => handleMove(event)}>
                                <DriveFileMoveIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <span>
                            <IconButton onClick={(event) => handleDelete(event)}>
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Move">
                        <span>
                            <IconButton disabled>
                                <DriveFileMoveIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <span>
                            <IconButton disabled>
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </>
            )}

        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired
};

function formatSize(sizeInBytes) {
    if (isNaN(sizeInBytes) || sizeInBytes <= 0) {
        return 'N/A';
    }

    if (sizeInBytes < 1024) {
        return sizeInBytes + ' B';
    } else if (sizeInBytes < 1024 * 1024) {
        return (sizeInBytes / 1024).toFixed(0) + ' KB';
    } else {
        return (sizeInBytes / (1024 * 1024)).toFixed(0) + ' MB';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date input
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return `${formattedDate} ${formattedTime}`;
}



export const Home = () => {
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);

    // const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    const documents = useSelector(state => state.documents.dataList);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchListDocuments());

                if (!_.isEqual(documents, rows)) {
                    sessionStorage.setItem('documents', JSON.stringify(documents));
                    setRows(documents);
                    console.log(documents)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch, documents, rows]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await dispatch(fetchListDocuments());
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [dispatch]);  // Only depend on `dispatch`

    // useEffect(() => {
    //     if (!_.isEqual(documents, rows)) {
    //         sessionStorage.setItem('documents', JSON.stringify(documents));
    //         setRows(documents);
    //         console.log(documents);
    //     }
    // }, [documents]);

    const handleDelete = async () => {
        const selectedDocs = rows.filter(row => selected.includes(row.name));
        console.log(selectedDocs);
        const documentIds = selectedDocs.map(doc => doc.name);
        console.log(documentIds);
        dispatch(fetchDeleteDocuments(documentIds));
        setSelected([]);
    };


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <div>
            <Box className={styles.headerContainer}>
                <Headers />
            </Box>
            <Box className={styles.appContainer}>
                <Box className={styles.mainContent}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} />
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {console.log(visibleRows[0])}
                                        {visibleRows.map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row.name)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <div className={styles.textRow}>
                                                            {row.name}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="left">{row.owner}</TableCell>
                                                    <TableCell align="left">{row.type}</TableCell>
                                                    <TableCell align="right">{formatSize(row.size)}</TableCell>
                                                    <TableCell align="right">{formatDate(row.dateModified)}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (dense ? 33 : 53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Home;