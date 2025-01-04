const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
const apiKey = process.env.REACT_APP_API_KEY;
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
    },
});

const baseImagePath = (size, path) => `https://image.tmdb.org/t/p/${size}${path}`;
const API = {
    genres: '/genre/movie/list?language=en',
    nowPlayingMovies: '/movie/now_playing',
    upcomingMovies: '/movie/upcoming',
    popularMovies: '/movie/popular',
    searchMovies: (keyword) => `/search/movie?query=${encodeURIComponent(keyword)}`,
    movieDetails: (id) => `/movie/${id}`,
};

const fetchData = async (endpoint, extraParams = {}) => {
    try {
        const response = await axiosInstance.get(endpoint, { params: extraParams });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

module.exports = { baseImagePath, API, fetchData, };
