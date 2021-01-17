import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import OptionSlider from '../components/OptionSlider';

const AdvancedSearch = () => {
    const [keyWords, setKeyWords] = useState("");
    const [searchOptions, setSearchOptions] = useState({
        Energy: 50,
        Speechiness: 50,
        Pace: 50,
        Popularity: 50
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
        setSearchOptions((prevSearchOptions) => {
            return {
                ...prevSearchOptions,
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
        <div className="advanced-search-page">
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
            </div>
            <hr />
            <div className="advanced-options">
                <OptionSlider name="Energy" onOptionUpdated={handleOptionChange} />
                <OptionSlider name="Speechiness" onOptionUpdated={handleOptionChange} />
                <OptionSlider name="Pace" onOptionUpdated={handleOptionChange} />
                <OptionSlider name="Popularity" onOptionUpdated={handleOptionChange} />
            </div>
        </div>
    );
}

export default AdvancedSearch;