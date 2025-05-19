import React from "react";
import { SearchBar } from "../components/SearchBar";
import { useAuth } from "@/Context/AuthContext";

export const Home = () => {
  const { user } = useAuth;
  console.log(user);
  return (
    <div>
      <SearchBar />
    </div>
  );
};
