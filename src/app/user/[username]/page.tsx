import { checkUserSession } from "@/utils/supabase/sessionChecker";
import React from "react";

interface Props {
  searchParams: { username: string };
}

const UserPage = async ({ searchParams }: Props) => {
  const { isSession, userData } = await checkUserSession();
  // console.log("userData:", userData);
  return <div>UserPage</div>;
};

export default UserPage;
