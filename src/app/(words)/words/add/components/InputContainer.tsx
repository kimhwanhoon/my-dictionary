"use client";

import { WordInput } from "./Input";

export const InputContainer = () => {
  return (
    <section>
      <WordInput />
    </section>
  );
};

// word input 과 submit은 이곳에 위치한다.
// definition과 example만 계속 추가할 수 있게 따로 만든다.
