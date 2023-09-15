import { useLocation } from "react-router-dom";
import { Brewery } from "../types/Types";

export default function BrewerySingle() {
  let { state } = useLocation();
  const brewery: Brewery = state.data;
  console.log(state);
  return (
    <div>
      <h1>{brewery.name}</h1>
      <h2>
        {brewery.city} - {brewery.state} - {brewery.country}
      </h2>
    </div>
  );
}
