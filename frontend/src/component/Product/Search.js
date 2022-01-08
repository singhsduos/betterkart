import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from "../layout/MetaData";
import "./SCSS/Search/Search.css";

const Search = () => {

    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate(`/products`);
        }
    }

    return (
        <>
            <MetaData title={`Search A Product -- BetterKart`} />
            <form onSubmit={searchSubmitHandler} className="searchBox">
                <input type="text" placeholder='Search a Product ...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>

        </>
    )
}

export default Search;
