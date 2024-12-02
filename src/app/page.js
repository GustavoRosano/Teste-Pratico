"use client";

import React, { useState } from "react";
import LoginRegister from "@/components/LoginRegister/LoginRegister";
import UsersTable from "./UsersTable/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-[45vw] w-full">
      {isLoggedIn ? (
        <UsersTable setIsLoggedIn={setIsLoggedIn} /> 
      ) : (
        <LoginRegister setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
