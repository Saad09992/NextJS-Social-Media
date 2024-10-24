"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/methods/authMethod";

function Profile() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>
          <Link href={`/profile/${data?._id}`}>{data?._id}</Link>
        </h2>
      </div>
    </div>
  );
}

export default Profile;
