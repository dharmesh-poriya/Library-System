"use client";
import React, { useEffect, useState } from "react";
const ROOT_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import { useRouter } from "next/navigation";

const Logout = () => {
  const { push } = useRouter();
  useEffect(() => {
    localStorage.clear();
    // clear all other data handlers

    push("/");
  });

  return (
    <div className="hero mx-auto min-h-screen bg-base-100">
      <h1>Please Wait..</h1>
    </div>
  );
};

export default Logout;