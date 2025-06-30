import React from "react";
import { useSelector } from "react-redux";
import UserProfileForm from "../components/UserProfileForm";

const UserProfile = () => {
  const { userProfile } = useSelector((state) => state.user);

  return <> <UserProfileForm /></>;
};

export default UserProfile;
