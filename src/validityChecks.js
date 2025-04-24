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

  // constraints[postalCodeName] will return 'undefined' if there is no data in postalCodeData.json under the postalCodeName value, so we should only do the constraint test if constraints[postalCodeName] is defined
  if (constraints[postalCodeName]) {
    const constraint = new RegExp(constraints[postalCodeName].regex, "");

    // If the postal code entered by the user follows the constraint, then we don't show any error
    if (constraint.test(postalCodeInput.value)) {
      postalCodeInput.setCustomValidity("");
    } else {
      postalCodeInput.setCustomValidity(
        constraints[postalCodeName].customMessage,
      );

      postalCodeInput.reportValidity();
    }
  } else {
    if (postalCodeInput.value.length >= 4) {
      postalCodeInput.setCustomValidity("");
    } else {
      postalCodeInput.setCustomValidity(
        "No official postal code format available; Postal code must be at least 4 digits",
      );

      postalCodeInput.reportValidity();
    }
  }
}

export function checkPassword() {}

export function checkConfirmPassword() {}

export function checkInvalid() {
  const email = document.querySelector("#email");
  const postalCode = document.querySelector("#postal-code");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");

  const country = document.querySelector("#country");

  const submit = document.querySelector("#submit");

  const inputElementsArr = [email, postalCode, password, confirmPassword];

  const form = document.querySelector("form");

  if (!form.checkValidity()) {
    inputElementsArr.forEach((element) => {
      if (element.validity.valueMissing) {
        submit.setCustomValidity(
          "Check empty inputs (Highlighted in red) - Inputs may not be empty.",
        );
        submit.reportValidity();
      } else if (!element.validity.valid) {
        submit.setCustomValidity(
          "Some inputs contain invalid values (Highlighted in red",
        );
        submit.reportValidity();
      } else {
        element.setCustomValidity("");
      }
    });

    if (country.value === "none") {
      country.setCustomValidity("Select a country.");
      country.reportValidity();
    } else {
      country.setCustomValidity("");
    }
  }
}
