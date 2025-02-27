import React from 'react';

const SearchContent = ({ results }) => {
    return (
        <div className="search-content">
            {results.length > 0 ? (
                results.map((movie, index) => (
                    <a key={index} href={`/starcinema/movie-detail/${movie.id}`} className="search-item">
                        <img src={movie.img_poster} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </a>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default SearchContent;