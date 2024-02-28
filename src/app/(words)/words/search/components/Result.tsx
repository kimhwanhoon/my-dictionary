/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { WordDetailModal } from "@/components/modals/WordDetail";
import { Database } from "@/types/supabaseTypes";
import { Pagination } from "@nextui-org/pagination";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type RenderDataType = Pick<
  Database["public"]["Tables"]["french_dictionary"]["Row"],
  "word" | "definition" | "example"
>;

interface Props {
  query: string;
  queryResult: Array<RenderDataType[]>;
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
  const [renderData, setRenderData] = useState<RenderDataType[]>([]);

  useEffect(() => {
    if (queryResult) {
      setRenderData(queryResult[currentPage - 1]);
    } else {
      console.log("error");
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
    renderData.map((el, i) => <WordDetailModal key={i} element={el} />)
  );

  return (
    <>
      <div className="bg-white">
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
    </>
  );
};
