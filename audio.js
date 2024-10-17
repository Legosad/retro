const submitBtn = document.querySelector("#audio-pass-submit");
const password = document.querySelector("#pass");
let correctPassword = "MyPass"; //Change Password here
const audioDiv = document.querySelector("#audio");
const passDiv = document.querySelector("#pass-div");
const incorrectPass = document.querySelector("#incorrect-input");
const emptyPassInput = document.querySelector("#empty-input");

submitBtn.addEventListener("click", function () {
  emptyPassInput.style.display = "none";
  incorrectPass.style.display = "none";
  if (password.value === correctPassword) {
    passDiv.classList.add("hidden");
    audioDiv.classList.remove("hidden");
  } else if (password.value === "") {
    emptyPassInput.style.display = "block";
  } else {
    incorrectPass.style.display = "block";
  }
});
