export function removeTitle(text: string): string {
  const regex = /<span class="inline">(.*?)<\/span><\/span>/; // 정규식 패턴
  return text.replace(regex, "");
}
