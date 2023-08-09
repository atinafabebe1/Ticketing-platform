import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import authService from './authService';

const initialState = {
  user: null,
  message: null,
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

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.response.data.error || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    return await authService.login(credentials);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.response.data.error || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.response.data.error || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    reset: (state, action) => {
      (state.message = null), (state.isLoading = false), (state.isSucess = false), (state.isError = false);
    }
  },
  extraReducers: (builder) => {
    // case for register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucess = true;
      state.isError = false;
      state.message = action.payload.message;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.isSucess = false;
      state.user = null;
    });

    // case for login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucess = true;
      state.isError = false;
      state.message = action.payload.message;
      state.user = action.payload.accessToken;
      console.log(action.payload.accessToken);
      console.log(state.user);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.isSucess = false;
      state.user = null;
    });

    // case for logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.message = null;
      state.isLoading = false;
      state.isSucess = false;
      state.isError = false;
    });
  }
});

// Action creators are generated for each case reducer function
export const { reset, setUser } = authSlice.actions;

export default authSlice.reducer;
