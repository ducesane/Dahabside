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
    
    const { data: user } = await supabase.auth.getUser();
    const {data: ProfileData, error: profileError} = await supabase
        .from("Users")
        .insert({
          username: username,
          
          full_name: fullname,
          id:user?.id
        })

        //  intaan waxa waaye  noo soo aqri waxa hada galina kaliya
        .select()
        .single();

        if(profileError){
          console.log('Profile creating error' ,profileError)

        }else{
          console.log(' profile created successfully', ProfileData)
        }

  }

  

  return data;
}
