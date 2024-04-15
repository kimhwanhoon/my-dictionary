export const addThemeOnCookie = async (theme: string) => {
  await fetch("/theme/add-theme", {
    body: JSON.stringify({ theme }),
    method: "POST",
  });
};
