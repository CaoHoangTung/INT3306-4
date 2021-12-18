import SearchBar from "material-ui-search-bar";
import React from "react";
import '../../pages/main/Main.scss'
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { searchPosts } from "../../api/posts";

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
        await searchPosts(queryString)
        .then(data => {
            this.setState({
                results: data.map(post => ({
                    id: post.post_id,
                    name: post.title,
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
        window.location.href = `/post/${item.id}`;
        console.log(item);
    }

    handleOnFocus() {
        console.log("Focused");
    }

    handleOnClear() {
        console.log("Cleared");
    }

    formatResult(result) {
        return <p>{result.slice(0,30)}</p>
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
                    autoFocus
                    formatResult={(item) => this.formatResult(item)}
                />
            </div>
        );
    }
}
export default Search;
