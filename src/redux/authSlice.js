
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRoles = createAsyncThunk('auth/fetchRoles', async () => {
  const response = await fetch('/roleData.json');
  if (!response.ok) throw new Error('Failed to load role data');
  return await response.json();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    roleData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    login: (state, action) => {
      const { name, email, password, role } = action.payload;

      const matchedUser = state.roleData.find(
        user =>
          user.name === name &&
          user.email === email &&
          user.password === password &&
          user.role === role 
      );

      if (matchedUser) {
        state.user = matchedUser;
        state.role = role;
        state.error = null;
      } else {
        state.user = null;
        state.role = null;
        state.error = 'Invalid credentials or mismatched role';
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roleData = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
