import supabase from "./supabase.js";

export async function signup(email, fullname, username, password) {
  console.log(" data from auth.js", email, fullname, username, password);
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log("User created:", data.user?.email);

  return data;
}
