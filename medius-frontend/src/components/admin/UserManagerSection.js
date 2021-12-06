import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar, Button, Container, Popover, TableHead } from '@material-ui/core';
import { createUser, deleteUser, getAllUsers, updateUser } from '../../api/users';
import React, { useEffect, useState } from 'react';
import { getAllRoles } from '../../api/roles';
import { CircularProgress, Input, MenuItem, Select } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
import { SmallNote, TablePaginationActions } from './Table';


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

function EditPasswordForm({ user, anchorEl, setAnchorEl, activeUserIdChangePassword, setActiveUserIdChangePassword }) {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const handleClick = (event) => {
        setActiveUserIdChangePassword(user.user_id);
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
        console.log(event.currentTarget);
    };

    const handleClose = () => {
        setActiveUserIdChangePassword(null)
        setAnchorEl(null);
    };

    const handleSubmit = () => {
        setLoading(true);
        updateUser({
            ...user,
            password_hash: newPassword
        }).then(response => {
            alert(`Password updated`)
            setLoading(false);
            handleClose();
        }).catch(error => {
            console.error(error);
            alert(`Cannot update password`);
            setLoading(false);
            handleClose();
        });
    }

    const open = Boolean(anchorEl) && activeUserIdChangePassword === user.user_id;
    // const id = open ? `changepassword-${user?.user_id}` : undefined;
    const id = `changepassword-${user?.user_id}`;

    return (
        <>
            {loading ? <CircularProgress /> :
                <>
                    <Button
                        aria-describedby={id}
                        onClick={handleClick}
                        title="Edit password"
                    >
                        <PasswordIcon />
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Input
                            autoFocus={true}
                            style={{ width: 300 }}
                            type="password"
                            id={`password-${user.user_id}`}
                            label="Password"
                            placeholder={`Change password for ${user?.first_name} ${user?.last_name}`}
                            value={newPassword}
                            onChange={e => {
                                setNewPassword(e.target.value)
                            }}
                            onKeyUp={e => {
                                // if key is enter
                                if (e.keyCode === 13 && newPassword !== "") {
                                    handleSubmit();
                                }
                            }}
                        />
                    </Popover>
                </>

            }
        </>
    )
}

export default function UserManageTable() {
    const [loading, setLoading] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [roles, setRoles] = useState([])

    const [userSearchString, setUserSearchString] = useState("");
    const [userRolesLoading, setUserRolesLoading] = useState([]);

    const [activeUserIdChangePassword, setActiveUserIdChangePassword] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const setUserRole = (rowIdx, roleId) => {
        setUserRolesLoading(userRolesLoading.map((loading, idx) => idx === rowIdx ? true : loading));

        const updatingUser = { ...displayedUsers[rowIdx], role_id: roleId };
        updateUser(updatingUser)
            .then(response => {
                let newUsers = displayedUsers.map((user, idx) => idx === rowIdx ? { ...user, role_id: roleId } : user);
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
        setUserRolesLoading(users.map(user => false))
    }, [users, page, rowsPerPage]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        if (userSearchString === "") {
            setDisplayedUsers(users);
        } else {
            const filteredUsers = users.filter(user => {
                return user.first_name.toLowerCase().includes(userSearchString.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(userSearchString.toLowerCase()) ||
                    user.email.toLowerCase().includes(userSearchString.toLowerCase());
            });
            setDisplayedUsers(filteredUsers);
        }
        setPage(0);
    }, [userSearchString, users]);


    return (
        <div className="MainSection_Container">
            <Container>
                <h1>User manager</h1>
                {loading ?
                    <CircularProgress />
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
                                        ? displayedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : displayedUsers
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
                                                <EditPasswordForm
                                                    user={row}
                                                    anchorEl={anchorEl}
                                                    setAnchorEl={setAnchorEl}
                                                    activeUserIdChangePassword={activeUserIdChangePassword}
                                                    setActiveUserIdChangePassword={setActiveUserIdChangePassword}
                                                />
                                                <Button
                                                    title={`Delete user ${row.first_name} ${row.last_name}`}
                                                    onClick={() => {
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
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={displayedUsers.length}
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
