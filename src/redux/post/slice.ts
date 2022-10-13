import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Endpoints } from "../../models/endpoints";
import { Thunks } from "../../models/thunks";
import { DraggableLocation } from "react-beautiful-dnd";
import customAxios from "../../utils/customAxios";
import {
  IPostSliceState,
  TAllPostsParams,
  TCreatePostParams,
  TEditPostParams,
  TLikePostParams,
  TUploadImageParams,
} from "./types";

export const createPost = createAsyncThunk(
  Thunks.CreatePost,
  async (params: TCreatePostParams, thunkAPI) => {
    try {
      const { data } = await customAxios.post(Endpoints.CreatePost, params);
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

export const fetchMyPosts = createAsyncThunk(
  Thunks.MyPosts,
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(`${Endpoints.MyPosts}${userId}`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  Thunks.AllPosts,
  async (params: TAllPostsParams, thunkAPI) => {
    try {
      const { search, page, totalPages } = params;
      let skipQuery = `&skip=${page ? (page === 1 ? 0 : page * 10) : 0}`;
      if (page && page === totalPages) {
        skipQuery = `&skip=${(totalPages - 1) * 10}`;
      }
      const searchQuery = `?search=${search}`;
      const { data } = await customAxios.get(
        `${Endpoints.AllPosts}${searchQuery}${skipQuery}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  Thunks.SinglePost,
  async (postId: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(
        `${Endpoints.SinglePost}${postId}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const deletePost = createAsyncThunk(
  Thunks.DeletePost,
  async (postId: string | undefined, thunkAPI) => {
    try {
      await customAxios.delete(`${Endpoints.DeletePost}${postId}`);
      toast.success("Successfully deleted");
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const editPost = createAsyncThunk(
  Thunks.EditPost,
  async (params: TEditPostParams, thunkAPI) => {
    const { postId, description, fullText, title } = params;
    try {
      const { data } = await customAxios.patch(
        `${Endpoints.EditPost}${postId}`,
        { description, fullText, title }
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const likePost = createAsyncThunk(
  Thunks.LikePost,
  async (params: TLikePostParams, thunkAPI) => {
    try {
      const { postId } = params;
      await customAxios.put(`${Endpoints.LikePost}${postId}`);
      return params;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const fetchUploadPostImage = createAsyncThunk(
  Thunks.PostImage,
  async (params: TUploadImageParams, thunkAPI) => {
    const { image, postId } = params;
    try {
      const { data } = await customAxios.put(
        `${Endpoints.UploadPostImage}${postId}`,
        image,
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

const initialState: IPostSliceState = {
  isLoading: false,
  allPosts: [],
  totalPages: 0,
  myPosts: [],
  post: null,
  search: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    sortMyPosts: (
      state,
      {
        payload,
      }: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) => {
      const { index: sourceIndex } = payload.source;
      const { index: destinationIndex } = payload.destination;
      const [reorderedPost] = state.myPosts.splice(sourceIndex, 1);
      state.myPosts.splice(destinationIndex, 0, reorderedPost);
    },

    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },

    clearSearch: (state) => {
      state.search = "";
    },
  },
  extraReducers: (builder) => {
    // My Posts

    builder.addCase(fetchMyPosts.pending, (state) => {
      state.isLoading = true;
      state.myPosts = [];
    });
    builder.addCase(fetchMyPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.myPosts = [...state.myPosts, ...payload.data];
    });
    builder.addCase(fetchMyPosts.rejected, (state) => {
      state.isLoading = false;
      state.myPosts = [];
    });

    // Create Post

    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      toast.success("Post created!");
    });
    builder.addCase(createPost.rejected, (state) => {
      state.isLoading = false;
    });

    // Fetch Single Post

    builder.addCase(fetchSinglePost.pending, (state) => {
      state.isLoading = true;
      state.post = null;
    });
    builder.addCase(fetchSinglePost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    });
    builder.addCase(fetchSinglePost.rejected, (state) => {
      state.isLoading = false;
      state.post = null;
    });

    // Edit Post

    builder.addCase(editPost.pending, (state) => {
      state.isLoading = true;
      state.post = null;
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
      toast.success("Post was successfully edited!");
    });
    builder.addCase(editPost.rejected, (state) => {
      state.isLoading = false;
      state.post = null;
    });

    // Fetch All Posts

    builder.addCase(fetchAllPosts.pending, (state) => {
      state.isLoading = true;
      state.allPosts = [];
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allPosts = payload.data;
      state.totalPages = Math.ceil(payload.pagination.total / 10);
    });

    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.isLoading = false;
      state.allPosts = [];
    });

    // Fetch Upload Image

    builder.addCase(fetchUploadPostImage.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
      toast.success("Image was successfully uploaded!");
    });

    // Fetch Like Post

    builder.addCase(likePost.fulfilled, (state, { payload }) => {
      const { isFullPost, postId, userId, isMyPosts } = payload;
      if (isFullPost && state.post) {
        if (state.post.likes.includes(userId)) {
          const updatedPost = {
            ...state.post,
            likes: state.post.likes.filter((item) => item !== userId),
          };
          state.post = updatedPost;
          return;
        }
        const updatedPost = {
          ...state.post,
          likes: [...state.post.likes, userId],
        };
        state.post = updatedPost;
        return;
      } else if (isMyPosts) {
        state.myPosts = state.myPosts.map((post) => {
          if (post._id === postId) {
            if (post.likes.includes(userId)) {
              return {
                ...post,
                likes: post.likes.filter((item) => item !== userId),
              };
            }
            return { ...post, likes: [...post.likes, userId] };
          }
          return post;
        });
      }
      state.allPosts = state.allPosts.map((post) => {
        if (post._id === postId) {
          if (post.likes.includes(userId)) {
            return {
              ...post,
              likes: post.likes.filter((item) => item !== userId),
            };
          }
          return { ...post, likes: [...post.likes, userId] };
        }
        return post;
      });
    });
  },
});

export const { setSearch, clearSearch, sortMyPosts } = postSlice.actions;

export default postSlice.reducer;
