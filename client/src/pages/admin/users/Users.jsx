import React, { useEffect, useState } from "react";

const User = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/admin/movies") // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data
      })
      .then((data) => setMovies(data)) // Set the received data to state
      .catch((error) => console.error("Fetch error:", error)); // Handle errors
  }, []);
  console.log(movies);
  return <div>AdminPage</div>;
};

export default User;
