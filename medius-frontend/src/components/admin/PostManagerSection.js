import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, CircularProgress, Container, TableHead } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import { SmallNote, TablePaginationActions } from './Table';
import { deletePost, getPost, getPosts, searchPosts } from '../../api/posts';

const columns = [
    { id: 'post_id', label: '#', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'info', label: 'Info', minWidth: 100, align: "right" },
    { id: 'action', label: 'Action', minWidth: 100, align: "right" },
];


export default function PostManageTable() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);

    const [postSearchString, setPostSearchString] = useState("");


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setLoading(true);
        getPosts().then((data) => {
            setPosts(data);
            setDisplayedPosts(data);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        if (postSearchString === "") {
            setDisplayedPosts(posts);
        } else {
            setLoading(true);
            const searchResults = [];

            getPost(postSearchString)
                .then(post => {
                    searchResults.push(post);
                }).catch(err => {
                }).finally(() => {
                    searchPosts(postSearchString)
                        .then(posts => {
                            searchResults.push(...posts);
                        }).catch(err => { })
                        .finally(() => {
                            setDisplayedPosts(searchResults);
                            setLoading(false);
                        })
                });
        }
        setPage(0);
    }, [postSearchString, posts]);


    return (
        <div className="MainSection_Container">
            <Container>
                <h1>Post manager</h1>

                <SearchBar
                    style={{
                        marginTop: "20px",
                        marginBottom: "10px",
                        height: '40px',
                        border: "none",
                    }}
                    value={postSearchString}
                    onChange={value => setPostSearchString(value)}
                />
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
                                        ? displayedPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : displayedPosts
                                    ).map((row, idx) => (
                                        <TableRow key={row.post_id}>
                                            <TableCell component="th" scope="row">{row.post_id}</TableCell>
                                            <TableCell component="th" scope="row"><b>{row.title}</b></TableCell>
                                            <TableCell align="right">
                                                <SmallNote><AccessTimeIcon fontSize="inherit" /> Created at {row.created_at}</SmallNote>
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
                                                        const confirm = window.confirm(`Are you sure you want to delete post ${row.title}?`);
                                                        if (confirm) {
                                                            deletePost(row.post_id)
                                                                .then(response => {
                                                                    alert(`Post ${row.title} deleted`);
                                                                    window.location.reload();
                                                                }).catch(error => {
                                                                    console.error(error);
                                                                    alert(`Cannot delete post ${row.post_id}`);
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
                                            count={displayedPosts.length}
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
