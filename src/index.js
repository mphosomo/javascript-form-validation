import "./styles.css";
import "./jsonToObject.js";

import {
  checkEmail,
  checkPostalCode,
  checkPassword,
  checkConfirmPassword,
} from "./validityChecks";

const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");

window.onload = () => {
  document.querySelector("#email").addEventListener("input", checkEmail);
  document
    .querySelector("#country")
    .addEventListener("change", checkPostalCode);
  document
    .querySelector("#postal-code")
    .addEventListener("input", checkPostalCode);
  document.querySelector("#password").addEventListener("input", checkPassword);
  document
    .querySelector("#confirm-password")
    .addEventListener("input", checkConfirmPassword);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs.forEach((input) => {
    input.required = true;
  });
});
