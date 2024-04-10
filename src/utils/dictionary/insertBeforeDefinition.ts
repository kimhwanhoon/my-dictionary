export const insertBefore = (
  originalText: string,
  insertText: string
): string => {
  const regex = /<div class="hom"/; // 정규식 패턴
  const match = originalText.match(regex); // 정규식과 일치하는 문자열 찾기

  // 정규식과 일치하는 문자열이 없으면 원본 문자열 그대로 반환
  if (!match) {
    return originalText;
  }

  // 정규식과 일치하는 문자열의 시작 위치
  const startIndex = match.index || 0;

  // insertText를 원본 문자열의 해당 위치에 삽입하여 새로운 문자열 생성
  const newText =
    originalText.slice(0, startIndex) +
    insertText +
    originalText.slice(startIndex);

  return newText;
};
