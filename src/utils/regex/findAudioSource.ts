interface Props {
  target: string;
}

export const findAudioSource = ({ target }: Props) => {
  const regex = new RegExp(`(?<=<audio)(.*?)(?=/audio>)`, "g");
  const matches = target.match(regex);

  const regex2 = /src="([^"]+)"/;
  const src = matches![0].match(regex2)![1];
  return src;
};
