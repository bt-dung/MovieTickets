import React, { useEffect, useState } from "react";

const MovieWidget = ({
  genres,
  movies,
  setMovieFilter,
  setSelectedGenres,
  selectedGenres,
}) => {
  const handleChangeGenres = (genreId) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId)
        : [...prevSelected, genreId]
    );
  };

  const filteredMovies =
    selectedGenres.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenres.every((selectedGenre) =>
            movie.genres.some((genre) => genre.id === selectedGenre)
          )
        );

  useEffect(() => {
    setMovieFilter(filteredMovies);
  }, [selectedGenres]);


  return (
    <>
      <div className="widget-1 widget-banner">
        <div className="widget-1-body">
          <a href="#0">
            <img src="/assets/images/movie/sonic3.jpg" alt="banner" />
          </a>
        </div>
      </div>

      <div className="widget-1 widget-check">
        <div className="widget-1-body">
          <h6 className="subtitle">Genre</h6>
          <div className="check-area">
            <div className="form-group">
              {genres.map((item) => (
                <div key={item.id}>
                  <input
                    type="checkbox"
                    id={`genre-${item.id}`}
                    checked={selectedGenres.includes(item.id)}
                    onChange={() => handleChangeGenres(item.id)}
                  />
                  <label htmlFor={`genre-${item.id}`}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="widget-1 widget-banner">
        <div className="widget-1-body">
          <a href="#0">
            <img src="/assets/images/banner/banner13.jpg" alt="banner" />
          </a>
        </div>
      </div>
    </>
  );
};

export default MovieWidget;
