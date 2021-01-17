import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect,} from "react-router-dom";
import LandingPage from '../components/LandingPage';
import Home from "../components/Home";
import AdvancedSearch from "../components/AdvancedSearch";

const App = () => {
    const handleSearch = (props) => {
        console.log(props);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                keywords: props.keywords,
                Energy: props.Energy,
                votes_to_skip: 5,
                guest_can_pause: true,
            })
        };
        fetch('/api/create-room', requestOptions)
            .then((response) =>response.json())
            .then((data) => console.log(data));
    }

    return (
        <Router>
            <Route exact path = "/">
                <LandingPage />
            </Route>
            <Route path = "/home">
                <Home onSearch={handleSearch} />
            </Route>
            <Route path = "/advanced-search">
                <AdvancedSearch onSearch={handleSearch} />
            </Route>
        </Router>
    );
}

export default App;