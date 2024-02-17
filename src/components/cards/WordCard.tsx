import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface Props {
  word: string;
  definition?: string;
  example?: string;
}

export const WordCard = ({ word, definition, example }: Props) => {
  return (
    <Card shadow="sm" className="my-3">
      <CardHeader>
        <span className="text-sm font-medium">{word}</span>
      </CardHeader>
      {(definition || example) && <Divider className="my-2" />}
      {definition && (
        <CardBody>
          <span className="text-sm text-gray-600">{definition}</span>
        </CardBody>
      )}
      {example && (
        <CardBody>
          <span className="text-sm text-gray-600">{example}</span>
        </CardBody>
      )}
    </Card>
  );
};
