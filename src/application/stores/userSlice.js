import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userUseCase from '../../domain/usecases/userUseCase';

const initialState = {
  users: [],
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  pagination: {
    totalElement: 0,
    totalPage: 0,
    size: 10,
    number: 0
  }
};

// Fetch users
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (params, thunkAPI) => {
    try {
      return await userUseCase.getUsers(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch users';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  'users/create',
  async (user, thunkAPI) => {
    try {
      return await userUseCase.createUser(user);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  'users/update',
  async (user, thunkAPI) => {
    try {
      return await userUseCase.updateUser(user);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      await userUseCase.deleteUser(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.content;
        state.pagination = {
          totalElement: action.payload.totalElement,
          totalPage: action.payload.totalPage,
          size: action.payload.size,
          number: action.payload.number
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, clearUser } = userSlice.actions;
export default userSlice.reducer;
