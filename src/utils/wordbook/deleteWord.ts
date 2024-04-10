interface DeleteWordProps {
  word: string;
  wordbookId: string;
}

export const deleteWordFromWordbook = async ({
  word,
  wordbookId,
}: DeleteWordProps) => {
  const { error } = await fetch("/api/wordbook/delete-word", {
    method: "POST",
    body: JSON.stringify({ word, wordbookId }),
  }).then((res) => res.json());

  if (error) {
    return false;
  } else {
    return true;
  }
};
