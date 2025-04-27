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
  console.log("User created:", data.user?.id);
  await new Promise((resolve) => setTimeout(resolve, 4000));
  console.log("4 sec kadiv");
  if (data?.user) {
    // Get the current session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      return data;
    }
     
    // If there's a session, proceed to create the user profile
    if (sessionData?.session) {
      const { data: user } = await supabase.auth.getUser();
      const { data: ProfileData, error: profileError } = await supabase
        .from("Users")
        .insert({
          username: username,
          full_name: fullname,
          id: user?.id,
        })
        .select()
        .single();

      if (profileError) {
        console.log("Profile creating error", profileError);
      } else {
        console.log(" profile created successfully", ProfileData);
      }
    } else {
      console.log(
        "No active session immediately after signup - profile creation skipped."
      );
      // You might want to handle this differently, perhaps show a message to the user
      // or retry the profile creation later.
    }
  }

  return data;
}
