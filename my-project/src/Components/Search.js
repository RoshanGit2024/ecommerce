import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const[keyword,setkeyword]=useState("")
    const navigate = useNavigate()

    const handleSearch=()=>{
         navigate('/search?keyword='+keyword)
    }
  return (
        <div className="input-group">
            <input
              type="text"
              id="search_field"
              onChange={(e)=>setkeyword(e.target.value)}
              onBlur={handleSearch}
              class="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button onClick={handleSearch} id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
  )
}

export default Search
