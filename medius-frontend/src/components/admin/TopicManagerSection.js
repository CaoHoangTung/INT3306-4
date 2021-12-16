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
import { Button, Container, TableHead } from '@material-ui/core';
import { createTopic, deleteTopic, getAllTopics } from '../../api/topic';
import React, { useEffect, useState } from 'react';
import { CircularProgress, Input } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
import { SmallNote, TablePaginationActions } from './Table';


const columns = [
    { id: 'topic', label: 'Topic', minWidth: 170 },
    { id: 'info', label: 'Info', minWidth: 100, align: "right" },
    { id: 'action', label: 'Action', minWidth: 100, align: "right" },
];


function CreateTopicForm({ roles, fetchTopics }) {
    const [topicName, setTopicName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const topic = {
            topic_name: topicName
        };

        createTopic(topic)
            .then(response => {
                alert(`Topic created`)
                fetchTopics();
            }).catch(error => {
                console.error(error);
                alert(`Cannot create topic`);
                console.error(error);
            });
    };


    return (
        <div>
            <h1>Create Topic</h1>
            <Input type="text" value={topicName} onChange={(event) => setTopicName(event.target.value)} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
        </div>
    )
}

export default function TopicManageTable() {
    const [loading, setLoading] = useState(false);
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [topics, setTopics] = useState([]);
    const [displayedTopics, setDisplayedTopics] = useState([]);

    const [topicSearchString, setTopicSearchString] = useState("");

    const fetchTopics = async () => {
        setLoading(true);
        getAllTopics()
            .then(result => {
                setTopics(result);
                console.log(result)
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchTopics();
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        if (topicSearchString === "") {
            setDisplayedTopics(topics);
        } else {
            const filteredTopics = topics.filter(topic =>
                topic.topic_name.toLowerCase().includes(topicSearchString.toLowerCase())
            );
            setDisplayedTopics(filteredTopics);
        }
        setPage(0);
    }, [topicSearchString, topics]);


    return (
        <div className="MainSection_Container">
            <Container>
                <h1>Topic manager</h1>
                {loading ?
                    <CircularProgress />
                    :
                    <>
                        <Button variant="contained" color={creatingTopic ? "default" : "primary"} onClick={() => setCreatingTopic(!creatingTopic)}>
                            {creatingTopic ? "- Cancel" : "+ Create Topic"}
                        </Button>
                        {creatingTopic ? <CreateTopicForm fetchTopics={fetchTopics} /> : <></>}

                        <SearchBar
                            style={{
                                marginTop: "20px",
                                marginBottom: "10px",
                                height: '40px',
                                border: "none",
                            }}
                            value={topicSearchString}
                            onChange={value => setTopicSearchString(value)}
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
                                        ? displayedTopics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : displayedTopics
                                    ).map((row, idx) => (
                                        <TableRow key={row.topic_id}>
                                            <TableCell component="th" scope="row">{row.topic_name}</TableCell>
                                            <TableCell align="right">
                                                <SmallNote><AccessTimeIcon fontSize="inherit" /> Created at {row.created_at}</SmallNote>
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                <Button
                                                    title={`Delete ${row.topic_name}`}
                                                    onClick={() => {
                                                        const confirm = window.confirm(`Are you sure you want to delete topic ${row.topic_name}?`);
                                                        if (confirm) {
                                                            console.log(row.topic_id)
                                                            deleteTopic(row.topic_id)
                                                                .then(response => {
                                                                    alert(`Topic ${row.topic_name} deleted`)
                                                                    fetchTopics();
                                                                }).catch(error => {
                                                                    console.error(error);
                                                                    alert(`Cannot delete topic ${row.topic_name}`);
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
                                            count={displayedTopics.length}
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
