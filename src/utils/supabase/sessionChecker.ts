import "server-only";

import { createClient } from "./server";
import { cookies } from "next/headers";

export const checkUserSession = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData?.user) {
      return { isSession: false, userData: null };
    } else {
      return { isSession: true, userData };
    }
  } catch (error) {
    return { isSession: false, userData: null };
  }
};
