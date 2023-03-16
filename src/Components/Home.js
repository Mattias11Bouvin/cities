import { useState } from "react";

function CountrySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [countryImage, setCountryImage] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setNoResults(true);
    fetch(`https://restcountries.com/v2/name/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCountryInfo(data[0]);
          setCountryDetails(data[0]);
          setCountryImage(data[0].flag);
          setNoResults(false);
        } else {
          setCountryInfo(null);
          setCountryDetails(null);
          setCountryImage(null);
        }
      });
  };

  return (
    <div>
      <h1>
        Welcome to search for the country you're always wanted to know more
        about!
      </h1>
      <input
        type="text"
        placeholder="Search for country here"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {countryInfo && countryDetails && !noResults ? (
        <div>
          {countryImage && (
            <img src={countryImage} alt={`${countryInfo.name} flag`} />
          )}
          <p className="country-info">
            <b>Name:</b> {countryInfo.name}
          </p>
          <p className="country-info">
            <b>Capital:</b> {countryInfo.capital}
          </p>
          <p className="country-info">
            <b>Population:</b> {countryInfo.population}
          </p>
          <p className="country-info">
            <b>Currency:</b> {countryDetails.currencies[0].name} (
            {countryDetails.currencies[0].code})
          </p>
          <p className="country-info">
            <b>Region:</b> {countryDetails.region}
          </p>
        </div>
      ) : (
        noResults && <p>No results found.</p>
      )}
    </div>
  );
}

export default CountrySearch;
