import axios from "axios";
import React, { useEffect, useState } from "react";
import { Brewery } from "../types/Types";
import { BreweryCard } from "../components/BreweryCard";
import SearchBar from "../components/Searchbar";
import { SelectChangeEvent } from "@mui/material";
import SelectForm, { SelectOptions } from "../components/SelectForm";

// API sample
// GET https://api.openbrewerydb.org/v1/breweries?per_page=3 : List of breweries
// GET https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=3: query by city
// GET https://api.openbrewerydb.org/v1/breweries?by_state=california&per_page=3: query by state

const topCitiesByPopulation = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
];

const topStatesByPopulation = [
  "California",
  "Texas",
  "Florida",
  "New York",
  "Pennsylvania",
  "Illinois",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan",
  "Washington",
];

export default function Home() {
  const [data, setData] = useState<Brewery[]>([]);
  const [search, setSearch] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [itemPerPage, setItemPerPage] = useState<string>("10");

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCityFilter = (event: SelectChangeEvent<string>) => {
    setCityFilter(event.target.value);
    setStateFilter(""); // Make sure that user can choose either city or state, not both
  };
  const handleStateFilter = (event: SelectChangeEvent<string>) => {
    setStateFilter(event.target.value);
    setCityFilter(""); // Make sure that user can choose either city or state, not both
  };

  const handleItemPerPage = (event: SelectChangeEvent<string>) => {
    setItemPerPage(event.target.value);
  };

  const filteredBreweries = data.filter((brewery) =>
    brewery.name.toLowerCase().includes(search.toLowerCase())
  );

  const transformArrayToOption = (array: string[]) => {
    let result: SelectOptions[] = array.map((option: string) => ({
      value: option.toLowerCase().replace(/ /g, "_"),
      displayLabel: option,
    }));
    return result;
  };

  useEffect(() => {
    const urlBase = `https://api.openbrewerydb.org/v1/breweries?per_page=${itemPerPage}`;
    let url = urlBase;
    if (stateFilter !== "") {
      url = urlBase + `&by_state=${stateFilter}`;
    }
    if (cityFilter !== "") {
      url = urlBase + `&by_city=${cityFilter}`;
    }

    axios
      .get(url)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, [cityFilter, stateFilter, itemPerPage]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Brewery App</h1>
      <SearchBar onChange={onSearchTermChange} />
      <div className="filter wrapper">
        <SelectForm
          inputLabel="Filter By City"
          value={cityFilter}
          onChange={handleCityFilter}
          options={transformArrayToOption(topCitiesByPopulation)}
        />
        <SelectForm
          inputLabel="Filter By State"
          value={stateFilter}
          onChange={handleStateFilter}
          options={transformArrayToOption(topStatesByPopulation)}
        />
        <SelectForm
          inputLabel="Result per page"
          value={itemPerPage}
          onChange={handleItemPerPage}
          options={transformArrayToOption(["10", "20", "50"])}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "start",
          justifyContent: "center",
          padding: "30px 0",
        }}
      >
        {filteredBreweries.map((item) => {
          return <BreweryCard {...item} />;
        })}
      </div>
    </div>
  );
}
