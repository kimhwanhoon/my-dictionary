import "server-only";

import { createClient } from "./server";
import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";

interface SessionCheckReturnType {
  isSession: boolean;
  sessionErrorMessage: string | null;
  userData: null | { user: User };
}

export const checkUserSession = async (): Promise<SessionCheckReturnType> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData?.user) {
      return {
        isSession: false,
        sessionErrorMessage: "User not signed in.",
        userData: null,
      };
    } else {
      return { isSession: true, sessionErrorMessage: null, userData };
    }
  } catch (error) {
    return {
      isSession: false,
      sessionErrorMessage: "User session check error occurred.",
      userData: null,
    };
  }
};
