import postalCodeDataJson from "./postalCodeData.json";

// Turns each element of the object into an array
const postalCodes = Object.entries(
  postalCodeDataJson.supplemental.postalCodeData,
);

// Using the postal codes array now to create an object entry for each element
// The object is now in the format: { countryCode: Regex }
export const constraints = {};
postalCodes.forEach(([countryCode, regex]) => {
  // Generate custom message from regex
  const customMessage = generatePostalCodeMessage(countryCode, regex);

  constraints[countryCode] = {
    regex,
    customMessage,
  };
});

// When performing regex checks, I can now use constraints.countryCode to get its Regex

function generatePostalCodeMessage(countryCode, regex) {
  let message = `${countryCode} postal code must:`;

  // Remove start/end anchors for easier parsing
  const clean = regex.replace(/^\^|\$$/g, "");

  if (
    clean.includes("(CH-)?") ||
    clean.includes("(F-)?") ||
    clean.includes("(D-)?") ||
    clean.includes("(NL-)?")
  ) {
    message +=
      "\n- Optionally begin with a country prefix (e.g. CH-, F-, etc.)";
  }

  const digitMatch = clean.match(/\\d\{(\d+)(?:,(\d+))?\}/g);
  if (digitMatch) {
    const parts = digitMatch.map((m) => {
      const [, min, max] = m.match(/\\d\{(\d+)(?:,(\d+))?\}/) || [];
      if (min && !max) return `${min} digits`;
      if (min && max) return `between ${min} and ${max} digits`;
      return "";
    });
    message += `\n- Include ${parts.join(" and ")}`;
  }

  if (clean.match(/\([A-Z]-\)\?/)) {
    message += "\n- Possibly include a country code prefix";
  }

  if (clean.match(/[A-Z]{2}/) || clean.includes("[A-Z]")) {
    message += "\n- Include uppercase letters";
  }

  if (clean.includes(" ")) {
    message += "\n- Include a space between components";
  }

  if (clean.includes("-\\d{4}")) {
    message += "\n- Optionally include a dash and 4 digits (e.g. 12345-6789)";
  }

  if (clean.includes("[A-RT-Z]") || clean.includes("S[BCE-RT-Z]")) {
    message += "\n- Use specific letter combinations (e.g. avoid SA, SD, SS)";
  }

  return message;
}
