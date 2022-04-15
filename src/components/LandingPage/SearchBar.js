// import './SearchBar.css'
// import { MDBBtn } from 'mdbreact'

// const SearchBar = () => {
//   return (
//     <div>
//       <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
//       <button gradient="aqua" size="sm" type="submit" className="btn">
//         Search
//       </button>
//     </div>
//   )
// }

// export default SearchBar

import { useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
  ];
  let results = [];
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  if (searchInput.length > 0) {
    results = countries.filter((country) => {
      let { name } = country;
      name = name.toLowerCase()
      return name.match(searchInput);
    });
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <div>
        {
          console.log(results)
        }
        {
        results.map((country, index) => {
          return (<div>
            <p>{country.name}</p>
            <p>{country.continent}</p>
          </div>);
        })}
      </div>
    </div>
  );
};
export default SearchBar;
