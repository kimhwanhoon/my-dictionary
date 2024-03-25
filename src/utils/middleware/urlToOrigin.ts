/**
 *
 * @param {string} url
 * @returns  {string} origin
 *
 * @example
 * const url = "https://google.com/a/b/c"
 * const result = urlToOrigin(url)
 * result = "https://google.com"
 */

export const urlToOrigin = (url: string) => {
  const protocol = url.split("://")[0];
  const urlWithoutProtocol = url.split("://")[1];

  const originWithoutProtocol = urlWithoutProtocol.split("/")[0];
  const origin = protocol + "://" + originWithoutProtocol;

  return origin;
};
