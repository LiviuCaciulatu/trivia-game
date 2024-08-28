import React, { useState, useEffect } from "react";
import './Game.css';

const fetchCountriesRoFull = async () =>{
    try {
        const response = await fetch('./CountriesRO.txt');
        const text = await response.text();

        const countries = text.split("\r\n\r\n").map(word=>word.trim()).filter(word=>word.length>0);
        let formattedCountries = countries.map(pair =>{
            const [country, capital] = pair.split(',').map(item=>item.trim());
            return [country,capital];
        })
        console.log(formattedCountries);
        return formattedCountries;

    } catch (error){
        console.error("Error fetching words:", error);
        return[];
    }
}



const Game = () =>{
    const[countries, setCountries] = useState([]);
    const [message, setMessage] = useState('');

    const loadCountries = async () => {
        const countries = await fetchCountriesRoFull();
        if (countries.length > 0) {
            setCountries(countries);
        } else {
          setMessage('Failed to load countries.');
        }
      };
      useEffect(() => {
        loadCountries();
      }, []);

    return(
    <p></p>
    )
}

export default Game;