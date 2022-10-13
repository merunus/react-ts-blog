import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { TCreateCommentParams } from "../../components/Comments/types";
import { Endpoints } from "../../models/endpoints";
import { Thunks } from "../../models/thunks";
import customAxios from "../../utils/customAxios";
import {
  ICommentSliceState,
  TComment,
  TEditCommentParams,
  TLikeCommentParams,
} from "./types";

export const createComment = createAsyncThunk(
  Thunks.CreateComment,
  async (params: TCreateCommentParams, thunkAPI) => {
    try {
      const { postId, text, followedCommentID } = params;
      if (followedCommentID) {
        const { data } = await customAxios.post(
          `${Endpoints.CreateComment}${postId}`,
          { text, followedCommentID }
        );
        return { data, replyTo: followedCommentID };
      }
      const { data } = await customAxios.post(
        `${Endpoints.CreateComment}${postId}`,
        { text }
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

export const likeComment = createAsyncThunk(
  Thunks.LikeComment,
  async (params: TLikeCommentParams, thunkAPI) => {
    try {
      const { commentId, userId } = params;
      await customAxios.put(`${Endpoints.LikeComment}${commentId}`);
      return { commentId, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error!");
    }
  }
);

export const fetchComments = createAsyncThunk(
  Thunks.Comments,
  async (postId: string, thunkAPI) => {
    try {
      const { data } = await customAxios.get(`${Endpoints.Comments}${postId}`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const deleteComment = createAsyncThunk(
  Thunks.DeleteComment,
  async (commentId: string, thunkAPI) => {
    try {
      await customAxios.delete(`${Endpoints.DeleteComment}${commentId}`);
      return { commentId };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const editComment = createAsyncThunk(
  Thunks.EditComment,
  async (params: TEditCommentParams, thunkAPI) => {
    const { commentId, text } = params;
    try {
      const { data } = await customAxios.patch(
        `${Endpoints.EditComment}${commentId}`,
        { text }
      );
      toast.success("Successfully edited");
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

const initialState: ICommentSliceState = {
  isLoading: false,
  comments: [],
  replies: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Comment

    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.comments = [...state.comments, payload];
      toast.success("Comment created!");
    });
    builder.addCase(createComment.rejected, (state) => {
      state.isLoading = false;
    });

    // Fetch Post Comments

    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.replies = payload.filter(
        (item: TComment) => item.followedCommentID
      );
      state.comments = payload.filter(
        (item: TComment) => !item.followedCommentID
      );
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.isLoading = false;
    });

    // Edit Comment
    builder.addCase(editComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editComment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.comments = state.comments.map((comment) =>
        comment._id === payload._id
          ? { ...comment, text: payload.text }
          : comment
      );
      state.replies = state.replies.map((reply) =>
        reply._id === payload._id ? { ...reply, text: payload.text } : reply
      );
    });
    builder.addCase(editComment.rejected, (state) => {
      state.isLoading = false;
    });

    // Delete Comment

    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== payload.commentId
      );
      state.replies = state.replies.filter(
        (reply) => reply._id !== payload.commentId
      );
      toast.success("Comment deleted!");
    });

    // Like Comment

    builder.addCase(likeComment.fulfilled, (state, { payload }) => {
      const { commentId, userId } = payload;
      state.comments = state.comments.map((comment) => {
        if (comment._id === commentId) {
          if (comment.likes.includes(userId)) {
            return {
              ...comment,
              likes: comment.likes.filter((item) => item !== userId),
            };
          }
          return { ...comment, likes: [...comment.likes, userId] };
        }
        return comment;
      });
      state.replies = state.replies.map((reply) => {
        if (reply._id === commentId) {
          if (reply.likes.includes(userId)) {
            return {
              ...reply,
              likes: reply.likes.filter((item) => item !== userId),
            };
          }
          return { ...reply, likes: [...reply.likes, userId] };
        }
        return reply;
      });
    });
  },
});

export default commentSlice.reducer;
