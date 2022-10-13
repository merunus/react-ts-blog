import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup.string().email().max(35).required(),
  password: yup.string().max(10).min(5).required(),
});

export const updateSchema = yup.object().shape({
  newName: yup.string().max(35),
  newProfession: yup.string().max(20),
});

export const registerSchema = yup.object().shape({
  name: yup.string().max(35).required(),
  email: yup.string().email().max(35).required(),
  password: yup.string().max(10).min(5).required(),
});

export const createPostSchema = yup.object().shape({
  title: yup.string().min(5).max(35).required(),
  description: yup.string().min(5).max(35).required(),
  text: yup.string().min(20).max(400).required(),
});

export const createCommentSchema = yup.object().shape({
  text: yup.string().min(5).max(50).required(),
});

export const editCommentSchema = yup.object().shape({
  comment: yup.string().min(5).max(50).required(),
});
export const replyCommentSchema = yup.object().shape({
  reply: yup.string().min(5).max(50).required(),
});
