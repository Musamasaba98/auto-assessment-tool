class InvalidUrlError extends Error {
  constructor({ url, statusCode, statusText }) {
    this.name = "InvalidUrlError";
    this.message = `There was an error retrieving CSS from ${url}.\n\tHTTP status code: ${statusCode} (${statusText})`;
  }
}

async function extractCSSRules(page, url, response) {
  if (response.status() >= 400) {
    await browser.close();
    return Promise.reject(
      new InvalidUrlError({
        url,
        statusCode: response.status(),
        statusText: response.statusText(),
      })
    );
  }
  const headers = response.headers();
  if (headers["content-type"].includes("text/css")) {
    const css = await response.text();
    return Promise.resolve(css);
  }
  const coverage = await page.coverage.stopCSSCoverage();
  const styleSheetsApiCss = await page.evaluate(() => {
    return (
      [...document.styleSheets]
        // Only take the stylesheets without href (BUT WHY)
        .filter((stylesheet) => stylesheet.href === null)
        .map((stylesheet) => {
          return {
            type: stylesheet.ownerNode.tagName.toLowerCase(),
            href: stylesheet.href || document.location.href,
            css: [...stylesheet.cssRules]
              .map(({ cssText }) => cssText)
              .join("\n"),
          };
        })
    );
  });
  //========================================Get inline css==================================
  // const inlineCssRules = await page.evaluate(() => {
  //   return (
  //     [...document.querySelectorAll("[style]")]
  //       .map((element) => element.getAttribute("style"))
  //       // Filter out empty style="" attributes
  //       .filter(Boolean)
  //   );
  // });
  // const inlineCss = inlineCssRules
  //   .map((rule) => `[x-extract-css-inline-style] { ${rule} }`)
  //   .map((css) => ({ type: "inline", href: url, css }));
  //======================================Get inline css=====================================
  const baseDomain = new URL(url).origin;
  const links = coverage
    .filter((entry) => entry.url !== url)
    .filter((entry) => new URL(entry.url).origin === baseDomain)
    .map((entry) => ({
      href: entry.url,
      css: entry.text,
      type: "link-or-import",
    }));
  const css = links
    .concat(styleSheetsApiCss)
    .map(({ css }) => css)
    .join("\n");
  return Promise.resolve(css);
}

export default extractCSSRules;
