import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import { getStorage } from "../../../services/storage";
import { PROFILE_STORAGE_KEY } from "../../../utils/constants";
import type { ProfileFormValues } from "../schemas/profile.schema";
import type { ProfileState, UserProfile } from "../types/profile.types.ts";

const defaultProfile: UserProfile = {
  displayName: "Game thủ",
  email: "",
  phone: "",
  birthday: "",
  bio: "",
  joinedAt: new Date().toISOString(),
};

const initialState: ProfileState = {
  profile: getStorage<UserProfile>(PROFILE_STORAGE_KEY, defaultProfile),
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<ProfileFormValues>) {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;

export const selectProfile = (state: RootState) => state.profile.profile;
