import styles from "../SearchBar/SearchBar.module.css";
import React from "react";

export default function SearchBar (props){
    const handleChange = (event) =>{
        const {value}= event.target;
        props.onSearch(value);
    };

    return(
        <div className={styles.navbar}>
            <input type= "search" placeholder="Search Breed 🐾" onChange={handleChange}/>
            <button onClick={() => props.onSearch('')}>Clear</button>
            </div>
    );
}