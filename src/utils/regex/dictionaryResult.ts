export const betterHTML = (phrase: string) => {
  const remove_end = phrase.replaceAll(/<!--[\s\S]*?-->/g, "");
  const remove_meta = remove_end.replaceAll(/<meta[\s\S]*?>/g, "");

  const changeSpan = remove_meta.replaceAll(
    /<span[\s\S]*?>/g,
    `<span class="text-gray-500 text-sm">`
  );

  const changeH2 = changeSpan.replaceAll(
    /<dl[\s\S]*?>/g,
    `<dl class="text-gray-700 text-15 text-medium">`
  );

  const changeLi = changeH2.replaceAll(
    /<li[\s\S]*?>/g,
    `<li class="text-gray-600 text-15 leading-snug">`
  );

  const giveSpaceAfterLi = changeLi.replaceAll(
    /<\/li>/g,
    `</li >\n<div class="h-[10px]"></div>`
  );

  const changeP = giveSpaceAfterLi.replaceAll(
    /<p[\s\S]*?>/g,
    `<p class="text-gray-700 text-15 tracking-wide">`
  );

  const removeFromAnglais = changeP.replaceAll(
    /<h2><span class="text-gray-500 text-sm"><span class="text-gray-500 text-sm">Anglais<\/span><\/span><\/h2>[\s\S]*?<\/div>/g,
    "</div>"
  );

  const removeBr = removeFromAnglais.replaceAll(/<br>/g, ``);

  return removeBr;
};
