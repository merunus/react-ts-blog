export type TUser = {
  _id: string;
  avatar?: string;
  email: string;
  password: string;
  name: string;
  extra_details?: string;
  skills?: string;
  profession?: string;
  details?: string;
  dateCreated: string;
  __v?: number;
};

export type TRegisterParams = {
  name: string;
  email: string;
  password: string;
};

export type TokenParams = {
  email: string;
  password: string;
};

export type UpdateParams = {
  userId: string;
  Name: string;
  Skills?: string;
  Profession?: string;
};

export type UpdateAvatarParams = {
  avatar: string | FormData;
  userId: string;
};

export type Modals = {
  userModal: boolean;
  sidebarModal: boolean;
};

export interface IUserSliceState {
  user: TUser | null;
  isLoading: boolean;
  isModalOpen: Modals;
  users: TUser[];
}
