async function extractCSSRules(page) {
  const cssRules = await page.evaluate(() => {
    const css = [];
    [...document.styleSheets].forEach((sheet) => {
      try {
        const rules = "cssRules" in sheet ? sheet.cssRules : sheet.rules;
        [...rules].forEach((rule) => {
          if ("cssText" in rule) {
            css.push(rule.cssText);
          } else {
            css.push(rule.selectorText + " {\n" + rule.style.cssText + "\n}\n");
          }
        });
      } catch (error) {
        console.log(
          `Access to stylesheet ${sheet.href} is denied. Ignoring...`
        );
      }
    });
    return css.join("\n"); // Join all collected CSS rules into a single string
  });

  return cssRules;
}

export default extractCSSRules;
