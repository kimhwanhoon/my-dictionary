import { redirect } from "next/navigation";

export const runtime = "edge";

const Home = async () => {
  redirect("/home");
};

export default Home;
