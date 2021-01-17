import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import OptionSlider from '../components/OptionSlider';

const AdvancedSearch = () => {
    const [keyWords, setKeyWords] = useState("");
    const [searchOptions, setSearchOptions] = useState({
        energy: 50,
        speechiness: 50,
        pace: 50,
        popularity: 50
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setKeyWords(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submitSearch(event);
        }
    };

    const handleOptionChange = (name, value) => {
        setSearchOptions((prevSearchOption) => {
            return {
                ...prevSearchOption,
                [name]: value
            };
        })
    }

    const submitSearch = (event) => {
        props.onSearch(note);
        setKeyWords("");
        event.preventDefault();
    };

    function valuetext(value) {
      return `${value}°C`;
    }

    return (
        <div className="home-page">
            <div>
                <form className="search-bar">
                    <SearchIcon className="search-icon" color="action" />
                    <input
                        name="search"
                        placeholder="Enter a keyword..."
                        value={keyWords}
                        autoComplete="off"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                </form>
                <div className="advanced-search-link">
                    <a href="">Advanced Search</a>                    
                </div>
            </div>
            <hr />
            <div className="advanced-options">
                <OptionSlider onOptionUpdated={handleOptionChange} />
            </div>
        </div>
    );
}

export default AdvancedSearch;