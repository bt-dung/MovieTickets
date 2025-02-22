import React from 'react';

const SearchContent = ({ results }) => {
    return (
        <div className="search-content">
            {results.length > 0 ? (
                results.map((movie, index) => (
                    <div key={index} className="search-item">
                        <img src={movie.img_poster} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default SearchContent;