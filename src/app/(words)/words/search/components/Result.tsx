/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Pagination } from "@nextui-org/pagination";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  query: string;
  queryResult: Array<
    {
      word: string;
    }[]
  >;
  totalPage: number;
  currentPage: number;
  error: boolean;
}
export const Result = ({
  query,
  queryResult,
  error,
  totalPage,
  currentPage,
}: Props) => {
  const router = useRouter();
  const [renderData, setRenderData] = useState<
    {
      word: string;
    }[]
  >([]);

  useEffect(() => {
    if (queryResult) {
      setRenderData(queryResult[currentPage - 1]);
    } else {
      console.log("what the heck");
    }
  }, [queryResult, currentPage]);

  if (error) {
    return <span>Error has occurred.</span>;
  } else if (!queryResult) {
    return <span>Result not found.</span>;
  }
  const output = !renderData ? (
    <>Data not found.</>
  ) : (
    renderData.map((el, i) => (
      <span key={i} className="border-b-1 pt-1">
        {el.word}
      </span>
    ))
  );

  return (
    <div>
      <h3 className="text-center font-medium text-15">Result</h3>
      {renderData && (
        <Pagination
          showShadow
          total={totalPage}
          isCompact
          page={currentPage}
          onChange={(e) => router.push(`?q=${query}&p=${e}`)}
        />
      )}
      <div className="flex flex-col gap-2 p-2 mt-4">
        {renderData?.length === 0 ? "Result not found." : output}
      </div>
    </div>
  );
};
