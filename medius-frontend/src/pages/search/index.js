import MainNavBar from "../../components/main/MainNavBar.js";
import MainSection from "../../components/search/SearchMainSection.js";
import React from 'react';
import { useState, useEffect } from 'react';
import { searchPosts } from "../../api/posts";

function Search(props) {
    const queryString = props.queryString;
    const [posts, setPosts] = useState([]);
    // const [users, setUsers] = React.useState([]);
    // const [topics, setTopics] = React.useState([]);

    // console.log(queryString);
    useEffect(() => {
        searchPosts(queryString)
        .then(data => {
            // console.log(data);
            setPosts(data);
        });
    }, [queryString]);

    return (
        <div className="Search">
            <MainNavBar />
            <MainSection posts={posts} queryString={queryString}/>
        </div>
    );
}

export default Search;