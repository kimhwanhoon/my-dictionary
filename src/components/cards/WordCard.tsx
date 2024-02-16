import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface Props {
  word: string;
  definition?: string;
  example?: string;
}

export const WordCard = ({ word, definition, example }: Props) => {
  return (
    <Card shadow="sm">
      <CardHeader>
        <span className="text-sm">{word}</span>
      </CardHeader>
      {(definition || example) && <Divider className="my-2" />}
      {definition && (
        <CardBody>
          <span className="text-sm">{definition}</span>
        </CardBody>
      )}
      {example && (
        <CardBody>
          <span className="text-sm">{example}</span>
        </CardBody>
      )}
    </Card>
  );
};
