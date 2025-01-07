import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ login, page }) => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${login} in:login&page=${page}&per_page=10`
    );
    return response.data.items;
  }
);

// Redux slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    login: '',
    users: [],
    page: 1,
    loading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
        state.hasMore = action.payload.length === 10;
        state.page += 1;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setLogin, resetUsers } = usersSlice.actions;

const store = configureStore({
  reducer: usersSlice.reducer,
});

export default store;
