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
import { createUser, deleteUser, getAllUsers, updateUser } from '../../api/users';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllRoles } from '../../api/roles';
import { CircularProgress, Input, MenuItem, Select } from '@mui/material';
import SearchBar from 'material-ui-search-bar';

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

function RoleSelect({ roles, value, onChange }) {
    return (
        <Select
            type="outlined"
            value={value}
            onChange={onChange}
        >
            <MenuItem disabled key="default" value={-1}>--- Select role ---</MenuItem>

            {roles.map((role) => (
                <MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>
            ))}
        </Select>
    )
}

function CreateUserForm({ roles, fetchUsers }) {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(-1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            role_id: role
        };
        console.log(user);
        createUser(user)
            .then(response => {
                alert(`User created`)
                fetchUsers();
            }).catch(error => {
                console.error(error);
                alert(`Cannot create user`);
                console.error(error);
            });
    };


    return (
        <div>
            <h1>Create User</h1>
            <Input id="firstname" label="FirstName" placeholder="First Name" value={firstName} onChange={e => setFirstname(e.target.value)} />
            <Input id="lastname" label="LastName" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            <Input id="email" label="Email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" id="password" label="Password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <RoleSelect roles={roles} value={role} onChange={e => setRole(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
        </div>
    )
}

export default function CustomPaginationActionsTable() {
    const [loading, setLoading] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([])
    const [emptyRows, setEmptyRows] = useState(0);

    const [userSearchString, setUserSearchString] = useState("");

    const [userRolesLoading, setUserRolesLoading] = useState([]);

    const setUserRole = (rowIdx, roleId) => {
        setUserRolesLoading(userRolesLoading.map((loading, idx) => idx === rowIdx ? true : loading));

        const updatingUser = { ...users[rowIdx], role_id: roleId };
        updateUser(updatingUser)
            .then(response => {
                let newUsers = users.map((user, idx) => idx === rowIdx ? { ...user, role_id: roleId } : user);
                setUsers(newUsers);
            })
            .catch(error => {
                alert(`Cannot update user role`);
                console.error(error);
            })
            .finally(() => {
                setUserRolesLoading(userRolesLoading.map((loading, idx) => idx === rowIdx ? false : loading));
            });
    }

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
        setUserRolesLoading(users.map(user => false))
    }, [users, page, rowsPerPage]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const getDisplayedUsers = useCallback(() => {
        if (userSearchString === "") {
            return users;
        } else {
            return users.filter(user =>
                user.first_name.toLowerCase().includes(userSearchString.toLowerCase()) ||
                user.last_name.toLowerCase().includes(userSearchString.toLowerCase()) ||
                user.email.toLowerCase().includes(userSearchString.toLowerCase())
            );
        }
    }, [userSearchString, users]);


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
                        {creatingUser ? <CreateUserForm roles={roles} fetchUsers={fetchUsers} /> : <></>}

                        <SearchBar
                            style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                                height: '40px',
                                border: "none",
                            }}
                            value={userSearchString}
                            onChange={value => setUserSearchString(value)}
                        />

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
                                        ? getDisplayedUsers(users).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : getDisplayedUsers(users)
                                    ).map((row, idx) => (
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
                                                {userRolesLoading[idx] ? <CircularProgress /> :
                                                    <RoleSelect
                                                        roles={roles}
                                                        value={row.role_id}
                                                        onChange={e => {
                                                            setUserRole(idx, e.target.value);
                                                        }}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                <Button onClick={() => {
                                                    const confirm = window.confirm(`Are you sure you want to delete user ${row.email}?`);
                                                    if (confirm) {
                                                        console.log(row.user_id)
                                                        deleteUser(row.user_id)
                                                            .then(response => {
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
