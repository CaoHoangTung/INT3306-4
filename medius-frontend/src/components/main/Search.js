import SearchBar from "material-ui-search-bar";
import React from "react";
import '../../pages/main/Main.scss'

class Search extends React.Component {
    render() {
        var value = "";
        return (
            <SearchBar
                style={{
                    margin: "0 auto",
                    height: '40px',
                    border: "none",                 
                }}
                placeholder = 'Search medius'
                onChange={(newValue) => {value = newValue }}
                onRequestSearch={() => window.location.href = `/search/${value}`}
            />
        );
    }
}
export default Search;