import { cookies } from "next/headers";
import { createClient } from "../server";

interface ReturnTypes {
  duplicated: boolean | null;
  error: boolean;
}

export const isUserEmailDuplicated = async (
  email: string
): Promise<ReturnTypes> => {
  try {
    const supabaseMasterClient = createClient(cookies(), { auth: true });
    const {
      data: { users },
    } = await supabaseMasterClient.auth.admin.listUsers();

    const emailDuplicated: boolean = users.some(
      (userData) => email === userData.email
    );

    if (emailDuplicated) {
      return { duplicated: true, error: false };
    } else {
      return { duplicated: false, error: false };
    }
  } catch (error) {
    return {
      duplicated: null,
      error: true,
    };
  }
};
