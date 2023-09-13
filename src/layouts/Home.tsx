import axios from "axios";
import React, { useEffect, useState } from "react";
import { Brewery } from "../types/Types";

// API sample
// GET https://api.openbrewerydb.org/v1/breweries?per_page=3 : List of breweries
// GET https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=3: query by city
// GET https://api.openbrewerydb.org/v1/breweries?by_state=california&per_page=3: query by state

export default function Home() {
  const [data, setData] = useState<Brewery[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://api.openbrewerydb.org/v1/breweries?by_city=boston&per_page=3"
      )
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <h1>Name: {item.name}</h1>
              <h2>Country: {item.country}</h2>
              <h3>City: {item.city}</h3>
              <h3>State: {item.state}</h3>
              <p>Phone: {item.phone}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
