import React, { useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const axios = require('axios');

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

    useEffect(() => {
        console.log('insert backend call here');
        const response = axios.get('/api/');
        // const url = '/playlist/search=' + params.get('search') ;
        // const response = axios.get(url);
        console.log(response);
      });

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
            <div>
                <TableContainer className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>TITLE</TableCell>
                                <TableCell>ARTIST</TableCell>
                                <TableCell>EXCLUDE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Cars With the Boom</TableCell>
                                <TableCell>L'Trimm</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bring the Noise</TableCell>
                                <TableCell>Public Enemy</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Big Poppa</TableCell>
                                <TableCell>The Notorious B.I.G.</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>King of Rock</TableCell>
                                <TableCell>Run-DMC</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gin and Juice</TableCell>
                                <TableCell>Snoop Doggy Dogg</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>White Lines (Don't Don't Do It)</TableCell>
                                <TableCell>Grandmaster and Melle Mel</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Grindin</TableCell>
                                <TableCell>Clipse</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Passin' Me By</TableCell>
                                <TableCell>The Pharcyde</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <div className="primary-button save-button"> Save Playlist </div>
            </div>
        </div>
    );
}

export default SearchResults;