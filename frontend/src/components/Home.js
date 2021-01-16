import React, { useState } from "react";

const Home = () => {
    const [keyWords, setKeyWords] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;

        setNote(value);
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
        <div>
            <div>
            <form className="search-bar">
                <input
                    name="search"
                    placeholder="Enter a keyword..."
                    value={keyWords}
                    autoComplete="off"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
            </form>
            </div>
        </div>
    );
}

export default Home;