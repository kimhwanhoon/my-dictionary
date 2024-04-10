export const ConfirmationSent = () => {
  return (
    <section className="px-10 py-16 rounded-xl shadow-large w-full mx-auto max-w-[400px] space-y-3 bg-slate-100 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80">
      <p className="font-medium text-center text-gray-700 dark:text-gray-200">
        Please check your email to confirm your account.
      </p>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        If you don&apos;t see the email, check other places it might be, like
        your junk, spam, social, or other folders.
      </p>
    </section>
  );
};
