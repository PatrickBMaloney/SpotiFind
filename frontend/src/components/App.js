import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect,} from "react-router-dom";
import LandingPage from '../components/LandingPage';
import Home from "../components/Home";

const App = () => {
    const handleSearch = () => {

    }

    return (
        <Router>
            <Route exact path = "/">
                <LandingPage />
            </Route>
            <Route path = "/home">
                <Home onSearch={handleSearch} />
            </Route>
        </Router>
    );
}

export default App;