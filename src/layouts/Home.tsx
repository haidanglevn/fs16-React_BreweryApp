import axios from "axios";
import React, { useEffect, useState } from "react";
import { Brewery } from "../types/Types";
import { BreweryCard } from "../components/BreweryCard";
import SearchBar from "../components/Searchbar";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

// API sample
// GET https://api.openbrewerydb.org/v1/breweries?per_page=3 : List of breweries
// GET https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=3: query by city
// GET https://api.openbrewerydb.org/v1/breweries?by_state=california&per_page=3: query by state

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
];

export default function Home() {
  const [data, setData] = useState<Brewery[]>([]);
  const [search, setSearch] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [itemPerPage, setItemPerPage] = useState<string>("10");

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStateFilterChange = (event: SelectChangeEvent<string>) => {
    setStateFilter(event.target.value);
  };

  const handlePerPageChange = (event: SelectChangeEvent<string>) => {
    setItemPerPage(event.target.value);
  };

  const filteredBreweries = data.filter((brewery) =>
    brewery.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    let url = `https://api.openbrewerydb.org/v1/breweries?per_page=${itemPerPage}`;
    if (stateFilter !== "") {
      url += `&by_state=${stateFilter}`;
      console.log("Filtering by state");
    }
    axios
      .get(url)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, [stateFilter, itemPerPage]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Brewery App</h1>
      <SearchBar onChange={onSearchTermChange} />
      <div className="filter wrapper">
        <FormControl variant="filled" style={{ minWidth: 200 }}>
          <InputLabel id="filter-select-label">Filter By State</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={stateFilter}
            onChange={handleStateFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {topStatesByPopulation.map((option) => {
              return (
                <MenuItem value={option.toLowerCase().replace(/ /g, "_")}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" style={{ minWidth: 200 }}>
          <InputLabel id="filter-select-label">Result per page</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={itemPerPage}
            onChange={handlePerPageChange}
          >
            <MenuItem defaultChecked value={"10"}>
              10
            </MenuItem>
            ;<MenuItem value={"20"}>20</MenuItem>;
            <MenuItem value={"50"}>50</MenuItem>;
          </Select>
        </FormControl>
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
