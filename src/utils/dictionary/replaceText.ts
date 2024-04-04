interface Props {
  target: string;
  originalText: string;
  replacement: string;
}

export const replaceText = ({
  originalText,
  replacement,
  target,
}: Props): string => {
  // target이 originalText에 포함되어 있는지 확인
  if (originalText.includes(target)) {
    // originalText에서 target을 replacement로 모두 대체한 새로운 문자열을 생성하여 반환
    return originalText.replace(new RegExp(target, "g"), replacement);
  }
  // target이 originalText에 없으면 그대로 반환
  return originalText;
};
