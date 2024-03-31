interface Props {
  target: string;
  originalText: string;
}

export const deleteText = ({ target, originalText }: Props): string => {
  // target이 originalText에 포함되어 있는지 확인
  if (originalText.includes(target)) {
    // originalText에서 target을 모두 제거한 새로운 문자열을 생성하여 반환
    return originalText.replace(new RegExp(target, "g"), "");
  }
  // target이 originalText에 없으면 그대로 반환
  return originalText;
};
