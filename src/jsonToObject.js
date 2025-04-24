import postalCodeDataJson from "./postalCodeData.json";

// Turns each element of the object into an array
const postalCodes = Object.entries(
  postalCodeDataJson.supplemental.postalCodeData,
);

// Using the postal codes array now to create an object entry for each element
// The object is now in the format: { postalCodeName: Regex }
export const constraints = {};
postalCodes.forEach(([postalCodeName, regex]) => {
  constraints[postalCodeName] = regex;
});

// When performing regex checks, I can now use constraints.postalCodeName to get its Regex
