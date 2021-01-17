import React from "react";
import SearchIcon from '@material-ui/icons/Search';

const SearchResults = () => {
    const params = new URLSearchParams(window.location.search);
    const handleChange = (event) => {
        const {name, value} = event.target;

        setKeyWords(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submitSearch(event);
        }
    };

    const submitSearch = (event) => {
        history.pushState({}, null, '/searchResults');
    };

    return(
        <div>
            <div className="search-results-header">
                <h2>Search Results</h2>
            </div>
            <form className="search-bar search-results-bar">
                <SearchIcon className="search-icon" color="action" />
                <input
                    name="search"
                    placeholder={params.get('search')}
                    value={params['search']}
                    autoComplete="off"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </form>
        </div>
    );
}

export default SearchResults;