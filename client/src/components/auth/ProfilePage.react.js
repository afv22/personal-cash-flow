import React from "react";
import AuthSubWrapper from "./AuthSubWrapper.react";
import ProfileReact from "./Profile.react";

const ProfilePage = () => {
  return (
    <AuthSubWrapper>
      <ProfileReact />
    </AuthSubWrapper>
  );
};

export default ProfilePage;
