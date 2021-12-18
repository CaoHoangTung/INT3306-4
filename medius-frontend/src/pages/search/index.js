import MainNavBar from "../../components/main/MainNavBar.js";
import MainSection from "../../components/search/SearchMainSection.js";
import React from 'react';
import { useState, useEffect } from 'react';
import { searchPosts } from "../../api/posts";
import { searchUsers } from "../../api/users";
import { searchTopics } from "../../api/topic";

function Search(props) {
    const queryString = props.queryString;
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = React.useState([]);
    const [topics, setTopics] = React.useState([]);

    useEffect(() => {
        searchPosts(queryString)
        .then(data => {
            setPosts(data);
        });
    }, [queryString]);

    useEffect(() => {
        searchUsers(queryString)
        .then(data => {
            setUsers(data);
        });
    }, [queryString]);

    useEffect(() => {
        searchTopics(queryString)
        .then(data => {
            setTopics(data);
        });
    }, [queryString]);

    return (
        <div className="Search">
            <MainNavBar />
            <MainSection 
                queryString={queryString}
                posts={posts}
                topics={topics}
                users={users} 
            />
        </div>
    );
}

export default Search;