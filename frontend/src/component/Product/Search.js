import React, { Fragment } from 'react'
import { useState } from 'react';
import "./Search.css";
import search from "../../images/search.png";
import MetaData from "../layout/MetaData";

const Search = ({history}) => {
    const [keyword,setKeyword]=useState("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }else{
            history.push("/products")
        }
    };
  return (
    <Fragment>
         <MetaData title="SEARCH--HOMEeasy" />
        <div className="searchContainer">
        <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input 
        type="text" 
        placeholder="Search a Product..." 
        onChange={(e)=>setKeyword(e.target.value)}
        />
        <input type="image"  alt="Submit" src={search }/>
        </form>
        </div>
    </Fragment>
  );
};

export default Search;