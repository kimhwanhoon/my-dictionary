export const extractPronunciation = (originalText: string): string | null => {
  if (!originalText) {
    return null;
  }
  const regex = /<span class="pron" type="">(.*?)<a href="#"/; // 정규식 패턴
  const match = originalText.match(regex); // 정규식과 일치하는 문자열 찾기

  // 정규식과 일치하는 문자열이 없거나, 배열의 두 번째 요소가 없으면 null 반환
  if (!match || match.length < 2) {
    return null;
  }

  // 배열의 두 번째 요소가 찾은 문자열의 내용
  return match[1];
};
