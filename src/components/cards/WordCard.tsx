import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface Props {
  word: string;
  definition?: string;
  example?: boolean;
}

export const WordCard = ({ word, definition, example }: Props) => {
  return (
    <Card shadow="sm">
      <CardHeader>{word}</CardHeader>
      {definition || (example && <Divider className="my-2" />)}
      {definition && <CardBody>{definition}</CardBody>}
      {example && <CardBody>{example}</CardBody>}
    </Card>
  );
};
