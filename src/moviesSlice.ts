import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchUpcomingMovies = createAsyncThunk<Movie[], { sortBy: string; order: string }>(
  "movies/fetchUpcoming",
  async ({ sortBy, order }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortBy}.${order}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchMoviesByQuery = createAsyncThunk(
  "movies/fetchMoviesByQuery",
  async ({ query, page = 1 }: { query: string; page?: number }, { rejectWithValue }) => {
    const API_URL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}&language=en-US&include_adult=false`;

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data.results;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  filteredMovies: [],
  searchQuery: "",
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      })
      .addCase(fetchMoviesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.filteredMovies = action.payload;
      })
      .addCase(fetchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
