import React from "react";
import { SearchBar } from "../components/SearchBar";
import { useAuth } from "@/context/AuthContext";

export const Home = () => {
  const { user } = useAuth;
  console.log(user);
  return (
    <div>
      <SearchBar />
    </div>
  );
};
