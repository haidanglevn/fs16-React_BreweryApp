import axios from "axios";
import React, { useEffect, useState } from "react";
import { Brewery } from "../types/Types";
import { BreweryCard } from "../components/BreweryCard";
import SearchBar from "../components/Searchbar";
import {
  Pagination,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import SelectForm, { SelectOptions } from "../components/SelectForm";
import Loading from "../components/Loading";

// API sample
// GET https://api.openbrewerydb.org/v1/breweries/{obdb-id}
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
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [cityFilter, setCityFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<string>("10");

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
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
    brewery.name.toLowerCase().includes(debounceSearch.toLowerCase())
  );

  const transformArrayToOption = (array: string[]) => {
    let result: SelectOptions[] = array.map((option: string) => ({
      value: option.toLowerCase().replace(/ /g, "_"),
      displayLabel: option,
    }));
    return result;
  };

  useEffect(() => {
    setIsLoading(true);
    const urlBase = `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${itemPerPage}`;
    let url = urlBase;
    if (stateFilter !== "") {
      url = urlBase + `&by_state=${stateFilter}`;
    }
    if (cityFilter !== "") {
      url = urlBase + `&by_city=${cityFilter}`;
    }

    const fetchData = axios.get(url);
    const delay = new Promise((resolve) => setTimeout(resolve, 1500)); // 1,5 second delay

    Promise.all([fetchData, delay])
      .then((results) => {
        const apiResult = results[0];
        setData(apiResult.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(`Failed to fetch data. ${err.message}`);
        setIsLoading(false);
      });
  }, [cityFilter, stateFilter, itemPerPage, page]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search]);

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}
    >
      <SearchBar onChange={onSearchTermChange} />
      <Stack
        className="filter wrapper"
        direction={"row"}
        gap={"10px"}
        paddingBottom={"20px"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
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
      </Stack>
      {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
      {isLoading && <Loading />}
      {filteredBreweries.length === 0 && !errorMessage && !isLoading ? (
        <Typography variant="body1">
          No breweries found. Try adjusting your filters.
        </Typography>
      ) : (
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={"30px"}
          padding={"10px 0"}
          sx={{ filter: isLoading ? "blur(10px)" : "none" }}
        >
          {filteredBreweries.map((item, index) => {
            return <BreweryCard {...item} key={index} />;
          })}
        </Stack>
      )}
      <Pagination
        count={10}
        color="primary"
        page={page || 1}
        onChange={handlePageChange}
        sx={{ paddingBottom: "30px" }}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
