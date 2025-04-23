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

export function checkPostalCode() {}

export function checkPassword() {}

export function checkConfirmPassword() {}
