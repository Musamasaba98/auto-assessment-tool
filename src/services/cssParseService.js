import css from "css";

const cssParseService = async (cssRules) => {
  const assessmentResults = {
    responsive: false,
    usesFlexbox: false,
    colorUsage: "good",
  };
  const cleanedContent = [...cssRules].map((line) => line.trim()).join("");
  const parsedCss = css.parse(cleanedContent);
  parsedCss.stylesheet.rules.forEach((rule) => {
    if (rule.type === "media") {
      assessmentResults.responsive = true;
    } else if (rule.type === "rule") {
      rule.declarations.forEach((declaration) => {
        if (declaration.property === "display") {
          if (declaration.value.includes("flex")) {
            assessmentResults.usesFlexbox = true;
          }
        }
      });
    } else {
      console.log("object1");
    }
  });
  return assessmentResults;
};

export default cssParseService;
