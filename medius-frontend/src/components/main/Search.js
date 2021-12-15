import SearchBar from "material-ui-search-bar";
import React from "react";
import '../../pages/main/Main.scss'

class Search extends React.Component {
    render() {
        return (
            <SearchBar
                style={{
                    margin: "0 auto",
                    height: '40px',
                    border: "none",                 
                }}
                placeholder = 'Search medius'
            />
        );
    }
}
export default Search;
