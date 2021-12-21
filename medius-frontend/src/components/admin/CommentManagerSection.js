import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar, Button, Container, Popover, TableHead } from '@material-ui/core';
import { deleteComment, getCommentAll } from '../../api/comments';
import React, { useEffect, useState } from 'react';
import { getAllRoles } from '../../api/roles';
import { CircularProgress, Input, MenuItem, Select } from '@mui/material';
import { SmallNote, TablePaginationActions } from './Table';


const columns = [
    { id: 'avatar', label: <Avatar sx={{ width: 14, height: 14 }} />, minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'comment', label: 'Comment', minWidth: 100, align: "right" },
    { id: 'action', label: 'Action', minWidth: 100, align: "right" },
];


export default function CommentManagerTable() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [comments, setComments] = useState([]);
    const [displayedComments, setDisplayedComments] = useState([]);

    const fetchComments = async () => {
        setLoading(true);
        getCommentAll()
            .then(result => {
                setComments(result);
                console.log(result)
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchComments();
    }, []);


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
                <h1>Comment manager</h1>
                {loading ?
                    <CircularProgress />
                    :
                    <>
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
                                        ? displayedComments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : displayedComments
                                    ).map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell component="th" scope="row">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={row.avatar_path}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">{row?.user_detail?.first_name + " " + row?.user_detail?.last_name}</TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                {row.content}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                <Button onClick={() => {
                                                    window.open(`/post/${row.post_id}`)
                                                }}>
                                                    <OpenInNewIcon />
                                                </Button>
                                                <Button
                                                    title={`Delete post ${row.post_id}`}
                                                    onClick={() => {
                                                        const confirm = window.confirm(`Are you sure you want to delete this comment?`);
                                                        if (confirm) {
                                                            deleteComment(row.comment_id)
                                                                .then(response => {
                                                                    alert(`Comment deleted`);
                                                                    window.location.reload();
                                                                }).catch(error => {
                                                                    console.error(error);
                                                                    alert(`Cannot delete comment ${row.comment_id}`);
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
                                            count={displayedComments.length}
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
