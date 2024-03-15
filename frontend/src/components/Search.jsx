import React, { useState } from 'react';

 const Search = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    fetch("http://localhost:3000/api/v1/getusernames")
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          const filteredResults = json.filter((user) => {
            return value && user && user.usernames && user.usernames.toLowerCase().includes(value.toLowerCase());
          });
          setResults(filteredResults);
        } else {
          console.error("JSON response is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
    fetchData(value);
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search usernames"
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};
export default Search;

