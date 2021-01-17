import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import PlaylistCard from "./PlaylistCard"
import Grid from '@material-ui/core/Grid';
import SearchResults from "./SearchResults";
// import { navigate } from "@reach/router";
const Home = () => {
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
        // alert('adpiefhawpih');
        // props.onSearch(note);
        // setKeyWords("");
        // event.preventDefault();
        history.pushState({}, null, '/searchResults');
        // window.location.href=window.base'searchResults';
        // navigate('/searchResults');
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
            <div className="playlist-section" justify="space-evenly" alignItems="stretch">
                <Grid className="playlist-grid" container>
                    <Grid item xs={3} spacing={3} > 
                        <PlaylistCard 
                            img="https://townsquare.media/site/812/files/2020/05/Illustrated-album-covers.jpg"
                            title="Lit"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <PlaylistCard 
                            img="https://www.nme.com/wp-content/uploads/2016/09/2015AlbumMeaningComp_2_240415.jpg"
                            title="Party"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <PlaylistCard 
                            img="https://i.redd.it/6fz4w2gd9ox01.jpg"
                            title="Funeral"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <PlaylistCard 
                            img="https://www.yardbarker.com/media/b/8/b8601cf5a1ce6be0421f710c8cdf89f05db3dd97/thumb_16x9/GettyImages-74290244.jpg"
                            title="Road Trip"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <PlaylistCard 
                            img="https://www.yardbarker.com/media/b/8/b8601cf5a1ce6be0421f710c8cdf89f05db3dd97/thumb_16x9/GettyImages-74290244.jpg"
                            title="Road Trip"
                        />
                    </Grid>
                </Grid>
            </div>
            <SearchResults/>
        </div>
    );
}

export default Home;