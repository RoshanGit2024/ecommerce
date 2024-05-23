import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation()

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    const clearKeyword=()=>{
      setKeyword("")
    }

    useEffect(()=>{
      if(location.pathname == '/'){
        clearKeyword()
      }
    },[location])

    return (
        <form onSubmit={handleSearch} className="input-group">
            <input
                type="text"
                id="search_field"
                onChange={(e) => setKeyword(e.target.value)}
                className="form-control"
                placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
                <button type="submit" id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    );
}

export default Search;
