interface Props {
  target: string;
  originalText: string;
}

export const deleteText = ({ target, originalText }: Props): string => {
  // Check if target is included in originalText
  if (originalText.includes(target)) {
    // Create and return a new string by removing all instances of target from originalText
    return originalText.replace(new RegExp(target, "g"), "");
  }
  // If target is not in originalText, return originalText as is
  return originalText;
};
