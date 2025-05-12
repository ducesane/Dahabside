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

  if (data?.user) {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      console.log(
        "no Active  session yet - profile  will be created at first sign in"
      );
      return data;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: ProfileData, error: profileError } = await supabase
      .from("Users")
      .insert({
        username: username,

        full_name: fullname,
        id: user?.id,
      })

      //  intaan waxa waaye  noo soo aqri waxa hada galina kaliya
      .select()
      .single();

    if (profileError) {
      console.log("Profile creating error", profileError);
    } else {
      console.log(" profile created successfully", ProfileData);
    }
  }

  return data;
}

// signin function

export async function signIn(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log(data);
  if (error) throw error;
}

//  Method waxa oo noo sheegaa in user-ka login dhahay iyo inkale

export async function getUserProfile(userId) {
  const { data: sessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userId)
    .single();
  //  tani wa hado ay dhacdo cilad postgrase
  if (error && error.code === "PGRST116") {
    console.log(
      "profile not found , attempting to create one for user",
      userId
    );

    // get user mail to make a username from it

    if (profileError) {
      console.log("Profile creation Error : ", profileError);
      throw profileError;
    } else {
      console.log("profile created successfully", newProfile);
    }

    return newProfile;
  }

  //  hadii ay jirto cidlad  guud kale
  if (error) {
    console.error("error from line 125, error fetching profile", error);
    throw error;
  }

  console.log("existing profile");
  return data;
}

export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, event);
  });
  return data.subscription.unsubscribe;
}
//  Signout  current User

export async function signout() {
  await supabase.auth.signOut();
}
