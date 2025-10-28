import axios from "axios";
import type { Movie } from "../types/movie";
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
