"use client";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface Props {
  word: string;
  definition?: string;
  example?: string;
}

export const WordCard = ({ word, definition, example }: Props) => {
  const cardOnClick = () => {
    console.log(word);
  };
  return (
    <div onClick={cardOnClick}>
      <Card shadow="sm" className="my-3">
        <CardHeader>
          <span className="text-base font-medium">{word}</span>
        </CardHeader>
        {(definition || example) && <Divider />}
        {(definition || example) && (
          <CardBody>
            {definition && (
              <span className="text-15 text-gray-700">{definition}</span>
            )}
            {example && (
              <span className="text-sm text-gray-500">{example}</span>
            )}
          </CardBody>
        )}
      </Card>
    </div>
  );
};
