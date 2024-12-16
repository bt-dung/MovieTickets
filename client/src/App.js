import React, { useEffect } from 'react';
import { API, fetchData, baseImagePath } from "./Api";

function App() {
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetchData(API.nowPlayingMovies);
        console.log("now:", data);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };
    const searchForMovies = async (keyword) => {
      try {
        const data = await fetchData(API.searchMovies(keyword));
        console.log("search:", data);
      } catch (error) {
        console.error('Error searching for movies:', error);
      }
    };
    const getGenres = async () => {
      try {
        const data = await fetchData(API.genres);
        console.log('genres:', data);
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    const getupcomingMovies = async () => {
      try {
        const data = await fetchData(API.upcomingMovies);
        console.log('upcomingMovies:', data);
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    const getpopularMovies = async () => {
      try {
        const data = await fetchData(API.popularMovies);
        console.log('popularMovies:', data);
      } catch (error) {
        console.error('Error fetching popularMovies:', error)
      }
    }
    const getmovieCastDetails = async () => {
      try {
        const data = await fetchData(API.movieCastDetails);
        console.log('movieCastDetails:', data);
      } catch (error) {
        console.error('Error fetching movieCastDetails:', error)
      }
    }


    getNowPlayingMovies();
    searchForMovies("Inception");
    getGenres();
    getupcomingMovies();
    getpopularMovies();
    getmovieCastDetails();
  }, []);

  const imageUrl = baseImagePath('w500', '/path_to_image.jpg');
  console.log(imageUrl);

  return (
    <div className="App">
      HelloWorld
    </div>
  );
}

export default App;
