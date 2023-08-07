import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import authService from './authService';

const initialState = {
  user: null,
  message: '',
  isLoading: false,
  isSucess: false,
  isError: false
};

export const initializeAuth = () => (dispatch) => {
  const userFromCookie = Cookies.get('user');
  if (userFromCookie) {
    dispatch(setUser(JSON.parse(userFromCookie)));
  }
};

export const register = createAsyncThunk('/user/auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = (error.response && error.response.dat && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.message = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucess = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = true;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
  }
});

// Action creators are generated for each case reducer function
export const { reset, setUser } = authSlice.actions;

export default authSlice.reducer;
