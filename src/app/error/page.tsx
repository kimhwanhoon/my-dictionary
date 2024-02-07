import { Button } from "@nextui-org/react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full min-h-[400px] space-y-2 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Uh oh! Something went wrong.
        </h1>
        <p className="text-gray-500">
          Don&apos;t worry, we&apos;re on it. Let&apos;s try to get you back to
          the home page.
        </p>
      </div>
      <Button fullWidth color="primary">
        <Link href={"/"}>Back to Home</Link>
      </Button>
    </section>
  );
};

export default ErrorPage;
