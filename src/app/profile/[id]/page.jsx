import React, { use } from "react";

function ProfilePage({ params }) {
  const uParams = use(params);
  const id = uParams.id;
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{id}</h2>
    </div>
  );
}

export default ProfilePage;
