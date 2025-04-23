import "./styles.css";

const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs.forEach((input) => {
    input.required = true;
  });
});
