import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import PlaylistCard from "./PlaylistCard"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const AdvancedSearch = () => {
    const [keyWords, setKeyWords] = useState("");

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
        props.onSearch(note);
        setKeyWords("");
        event.preventDefault();
    };

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
            <div className={classes.root}>
            <Typography id="discrete-slider" gutterBottom>
                Temperature
            </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
            />
            <Typography id="discrete-slider" gutterBottom>
                Disabled
            </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
                disabled
            />
            </div>
        </div>
    );
}

export default AdvancedSearch;