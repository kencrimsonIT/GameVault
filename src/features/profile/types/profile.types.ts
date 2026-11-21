export type UserProfile = {
  displayName: string;
  email: string;
  phone: string;
  birthday: string;
  bio: string;
  joinedAt: string;
};

export type ProfileState = {
  profile: UserProfile;
};
