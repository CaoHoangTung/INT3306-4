import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar, Button, Container, TableHead } from '@material-ui/core';
import { deleteUser, getAllUsers } from '../../api/users';
import React, { useEffect, useState } from 'react';
import { getAllRoles } from '../../api/roles';
import { MenuItem, Select } from '@mui/material';
import SignUp from '../home/SignUp';

function SmallNote(props) {
    return (
        <Box
            sx={{
                fontSize: 10,
                fontWeight: 'italic',
                color: 'text',
                mb: 2,
            }}
        >
            {props.children}
        </Box>
    );
}

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
    { id: 'avatar', label: <Avatar sx={{ width: 14, height: 14 }} />, minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100, align: "right" },
    { id: 'info', label: 'Info', minWidth: 100, align: "right" },
    { id: 'role', label: 'Role', minWidth: 100, align: "right" },
    { id: 'action', label: 'Action', minWidth: 100, align: "right" },
];

function CreateUserForm() {
    return (
        <div>
            <h1>Create User</h1>
            <SignUp />
        </div>
    )
}

export default function CustomPaginationActionsTable() {
    const [loading, setLoading] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [roles, setRoles] = useState([])
    const [emptyRows, setEmptyRows] = useState(0);

    const fetchRoles = async () => {
        setLoading(true);
        getAllRoles()
            .then(result => {
                setRoles(result);
                console.log(result)
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    const fetchUsers = async () => {
        setLoading(true);
        getAllUsers()
            .then(result => {
                setUsers(result);
                console.log(result)
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, []);

    useEffect(() => {
        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
        setEmptyRows(emptyRows);
        setUserRoles(users.map(user => user.role_id));
    }, [users, page, rowsPerPage]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="MainSection_Container">
            <Container>
                <h1>User manager</h1>
                {loading ?
                    <div>Loading...</div>
                    :
                    <>
                        <Button variant="contained" color={creatingUser ? "default" : "primary"} onClick={() => setCreatingUser(!creatingUser)}>
                            {creatingUser ? "- Cancel" : "+ Create User"}
                        </Button>
                        {creatingUser ? <CreateUserForm /> : <></>}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : users
                                    ).map((row) => (
                                        <TableRow key={row.email}>
                                            <TableCell component="th" scope="row">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={row.avatar}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">{row.first_name + " " + row.last_name}</TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="right">
                                                <SmallNote><AccessTimeIcon fontSize="inherit" /> Register at {row.register_at}</SmallNote>
                                                <SmallNote><AccessTimeIcon fontSize="inherit" /> Last seen at {row.last_seen_at}</SmallNote>
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                <Select
                                                    style={{ width: "100%" }}
                                                    value={row.role_id}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                    }}
                                                >
                                                    {roles.map((role) => (
                                                        <MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                <Button onClick={() => {
                                                    const confirm = window.confirm(`Are you sure you want to delete user ${row.email}?`);
                                                    if (confirm) {
                                                        console.log(row.user_id)
                                                        deleteUser(row.user_id)
                                                            .then(response => {
                                                                console.log(response)
                                                                alert(`User ${row.email} deleted`)
                                                                fetchUsers();
                                                            }).catch(error => {
                                                                console.error(error);
                                                                alert(`Cannot delete user ${row.email}`);
                                                                console.error(error);
                                                            });
                                                    }
                                                }} >
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={users.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </>
                }
            </Container>
        </div>
    );
}
