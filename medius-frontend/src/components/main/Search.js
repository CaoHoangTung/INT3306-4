import React from "react";
import '../../pages/main/Main.scss'
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Avatar } from '@material-ui/core';
import UserIntro from "../home/UserIntro";
import { searchPosts } from "../../api/posts";
import { searchUsers } from "../../api/users";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            results: []
        }
    }

    async fetchResults() {
        const queryString = this.state.searchText;
        await searchUsers(queryString)
        .then(data => {
            console.log(data);
            this.setState({
                results: data.map(user => ({
                    id: user.user_id,
                    name: user.first_name + " " + user.last_name,
                    avatar: user.avatar_path
                })),
            });
        });
    }

    async handleChange(value) {
        this.setState({
            searchText: value
        });
        await this.fetchResults();
    }

    async handleOnSearch(string, results) {
        await this.handleChange(string);
        console.log(results);
    };

    handleOnHover(result) {
        console.log(result);
    }

    handleOnSelect(item) {
        window.location.href = `/profile/${item.id}`;
        console.log(item);
    }

    handleOnFocus() {
        console.log("Focused");
    }

    handleOnClear() {
        console.log("Cleared");
    }

    formatResult(result) {
        const user = this.state.results.filter(user => user.name === result)[0];
        if (user.id === "0") {
            return (
                <p>{result}</p>
            )
        } else {
            return (
                <UserIntro
                    author={user.name}
                    image={user.avatar}
                    link={`/profile/${user.id}`}
                />
            )
        }
    }

    render() {
        return (
            <div 
                style={{
                    margin: "0 auto",
                    height: '40px',
                    border: "none",
                    width: '400px',                
                }}
            >
                <ReactSearchAutocomplete
                    placeholder = 'Search medius'
                    items = {this.state.results}
                    onChange={this.handleChange}
                    onSearch={(value, results) => this.handleOnSearch(value, results)}
                    onHover={(result) => this.handleOnHover(result)}
                    onSelect={(item) => this.handleOnSelect(item)}
                    onFocus={() => this.handleOnFocus()}
                    onClear={() => this.handleOnClear()}
                    styling={{ zIndex: 2 }} 
                    // autoFocus
                    formatResult={(item) => this.formatResult(item)}
                />
            </div>
        );
    }
}
export default Search;
