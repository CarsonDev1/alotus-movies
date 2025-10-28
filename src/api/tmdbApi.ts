import axios from "axios";
import type { CreditsResponse, Movie, Video } from "../types/movie";
import type { PaginatedResponse } from "../types/api";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getNowPlaying = async (page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await tmdb.get<PaginatedResponse<Movie>>("/movie/now_playing", {
    params: { page },
  });
  return data;
};

export const getTopRated = async (
  page = 1
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await tmdb.get<PaginatedResponse<Movie>>("/movie/top_rated", {
    params: { page },
  });
  return data;
};

export const searchMovies = async (query: string) => {
  if (!query.trim()) return { results: [] };
  const { data } = await tmdb.get("/search/movie", {
    params: { query, page: 1, include_adult: false },
  });
  return data;
};

export const getMovieDetail = async (id: string | number): Promise<Movie> => {
  const { data } = await tmdb.get<Movie>(`/movie/${id}`);
  return data;
};

export const getMovieVideos = async (id: string | number): Promise<Video[]> => {
  const { data } = await tmdb.get<{ results: Video[] }>(`/movie/${id}/videos`);
  return data.results;
};

export const getMovieCredits = async (id: string | number): Promise<CreditsResponse> => {
  const { data } = await tmdb.get<CreditsResponse>(`/movie/${id}/credits`);
  return data;
};