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
                                <TableCell>dawpi</TableCell>
                                <TableCell>dawpi</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default SearchResults;