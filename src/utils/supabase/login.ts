"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { data, error } = await supabase.auth.signInWithOtp({
    email: formData.get("email") as string,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      // emailRedirectTo: "http://localhost:3000/home",
    },
  });
  console.log("🚀 ~ login ~ data:", data);
  console.log(data);
  console.log("🚀 ~ login ~ error:", error);

  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  // const { error } = await supabase.auth.signInWithPassword(data);
  // if (error) {
  //   if (error.message === "Email not confirmed") {
  //     redirect("/error");
  //   }
  //   redirect("/error");
  // }
  if (!error) {
    redirect(`signin?otp-sent=true&email=${formData.get("email") as string}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: signupData } = await supabase.auth.signUp(data);
  console.log("🚀 ~ signup ~ signupData:", signupData);

  if (error) {
    console.log("signup error:" + error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
