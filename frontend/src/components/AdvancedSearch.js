import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import OptionSlider from '../components/OptionSlider';
import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
  
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

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
            <div className="submit-button">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary">Search</Button>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default AdvancedSearch;