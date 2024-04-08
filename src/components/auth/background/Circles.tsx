interface CirclesProps {
  quantity?: number;
}

export const Circles = ({ quantity: length = 30 }: CirclesProps) => {
  const circles = Array.from({ length }).map((_, i) => <span key={i}></span>);
  return <>{circles}</>;
};
