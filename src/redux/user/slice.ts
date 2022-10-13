import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Endpoints } from "../../models/endpoints";
import { Thunks } from "../../models/thunks";
import customAxios from "../../utils/customAxios";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
} from "../../utils/local-storage/addDataToLc";
import { removeUserFromLocalStorage } from "../../utils/local-storage/deleteDataFromLc";
import { getDataFromLocalStorage } from "../../utils/local-storage/getDataFromLc";
import {
  IUserSliceState,
  TokenParams,
  TRegisterParams,
  UpdateAvatarParams,
  UpdateParams,
} from "./types";

export const fetchRegister = createAsyncThunk(
  Thunks.Register,
  async (params: TRegisterParams, thunkAPI) => {
    try {
      const { data } = await customAxios.post(Endpoints.Register, params);
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error, { duration: 1000 });
      }
      return thunkAPI.rejectWithValue("There was an error!");
    }
  }
);




export const fetchUserByToken = createAsyncThunk(
  Thunks.UserByToken,
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get(Endpoints.UserByToken);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("There was an error!");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  Thunks.UserById,
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(`${Endpoints.UserById}${userId}`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("There was an error!");
    }
  }
);

export const fetchToken = createAsyncThunk(
  Thunks.Token,
  async (params: TokenParams, thunkAPI) => {
    try {
      const { data } = await customAxios.post(Endpoints.Login, params);
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error, { duration: 1000 });
      }
      return thunkAPI.rejectWithValue(
        "Please provide valid email and password!"
      );
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  Thunks.Update,
  async (params: UpdateParams, thunkAPI) => {
    const { userId, Skills, Name, Profession } = params;
    try {
      const { data } = await customAxios.patch(`${Endpoints.Update}${userId}`, {
        name: Name,
        skills: Skills,
        profession: Profession,
      });
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error, { duration: 1000 });
      }
      return thunkAPI.rejectWithValue("Please provide valid data");
    }
  }
);

export const fetchUpdateAvatar = createAsyncThunk(
  Thunks.Avatar,
  async (params: UpdateAvatarParams, thunkAPI) => {
    const { avatar, userId } = params;
    try {
      const { data } = await customAxios.put(
        `${Endpoints.UpdateAvatar}${userId}`,
        avatar,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error, { duration: 1000 });
      }
      return thunkAPI.rejectWithValue("Please provide valid data");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  Thunks.Users,
  async (_, thunkAPI) => {
    try {
      const { data } = await customAxios.get(Endpoints.Users);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("There was an error!");
    }
  }
);

const initialState: IUserSliceState = {
  user: getDataFromLocalStorage("user"),
  users: [],
  isLoading: false,
  isModalOpen: {
    userModal: false,
    sidebarModal: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    closeModal: (state, { payload }: PayloadAction<string>) => {
      payload === "userModal"
        ? (state.isModalOpen.userModal = false)
        : (state.isModalOpen.sidebarModal = false);
    },
    openModal: (state, { payload }: PayloadAction<string>) => {
      payload === "userModal"
        ? (state.isModalOpen.userModal = true)
        : (state.isModalOpen.sidebarModal = true);
    },
    logout: (state) => {
      state.user = null;
      toast.success("Successfully logged out!");
      removeUserFromLocalStorage(["user", "token"]);
    },
  },
  extraReducers: (builder) => {
    // Register

    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true;
      state.user = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      addUserToLocalStorage(action.payload);
      toast.success("Account was successfully created", { duration: 2000 });
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
    });

    // Token

    builder.addCase(fetchToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.isLoading = false;
      addTokenToLocalStorage(action.payload.token);
    });
    builder.addCase(fetchToken.rejected, (state) => {
      state.isLoading = false;
    });

    // User By Token

    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      state.user = action.payload;
      addUserToLocalStorage(action.payload);
      toast.success(`Welcome back, ${state.user?.name}`);
    });

    // Update

    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      addUserToLocalStorage(action.payload);
      toast.success("Successfully updated!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 300);
    });

    // All users
    builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
      state.users = [...payload.data];
    });

    // Update Avatar

    builder.addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
      state.user = action.payload;
      addUserToLocalStorage(action.payload);
      toast.success("Successfully updated!");
    });
  },
});
export const { openModal, closeModal, logout } = userSlice.actions;

export default userSlice.reducer;
