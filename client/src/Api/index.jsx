import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
    },
});

export const baseImagePath = (size, path) => `https://image.tmdb.org/t/p/${size}${path}`;

export const API = {
    genres: '/genre/movie/list?language=en',
    nowPlayingMovies: '/movie/now_playing',
    upcomingMovies: '/movie/upcoming',
    popularMovies: '/movie/popular',
    searchMovies: (keyword) => `/search/movie?query=${keyword}`,
    movieDetails: (id) => `/movie/${id}`,
    movieCastDetails: (id) => `/movie/${id}/credits`,
};

export const fetchData = async (endpoint) => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
