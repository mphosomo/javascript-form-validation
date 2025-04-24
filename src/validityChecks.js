import { constraints } from "./jsonToObject";

export function checkEmail() {
  const email = document.querySelector("#email");
  const emailValue = email.value;

  if (email.validity.typeMismatch || !emailValue.includes(".")) {
    email.setCustomValidity("Email must be in the format 'username@domain.tld");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
}

export function checkPostalCode() {
  const postalCodeName = document.querySelector("#country").value;
  const postalCodeInput = document.querySelector("#postal-code");

  const constraint = new RegExp(constraints[postalCodeName], "");

  // If the postal code entered by the user follows the constraint, then we don't show any error
  if (constraint.test(postalCodeInput.value)) {
    postalCodeInput.setCustomValidity("");
  } else {
    postalCodeInput.setCustomValidity(constraints[postalCodeName]);
    postalCodeInput.reportValidity();
  }
}

export function checkPassword() {}

export function checkConfirmPassword() {}
