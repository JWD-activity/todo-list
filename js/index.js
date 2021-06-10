"use strict";
// Element seletors
const closeForm = document.getElementById("closeForm");
const submitForm = document.getElementById("submitForm");
const formData = document.getElementById("fromData");
const taskName = document.getElementById("name");
const description = document.getElementById("description");
const assigned = document.getElementById("assigned");
const date = document.getElementById("date");
const status = document.getElementById("status");
const btnAdd = document.getElementById("addBtn");
const errMsg = document.getElementById("errMsg");

// Founctions
const clearForm = () => {
  taskName.value =
    description.value =
    description.value =
    assigned.value =
    date.value =
    status.value =
      "";
  errMsg1.textContent =
    errMsg2.textContent =
    errMsg3.textContent =
    errMsg4.textContent =
    errMsg5.textContent =
      "";
};

const isValid = () => {
  console.log(taskName.value.length);
  if (taskName.value.length < 5) {
    errMsg1.innerHTML = `Please enter more than 5 characters.`;
  } else {
    errMsg1.innerHTML = "";
  }

  if (description.value.length < 5) {
    errMsg2.innerHTML = `Please enter more than 5 characters.`;
  } else {
    errMsg2.innerHTML = "";
  }

  if (assigned.value.length < 5) {
    errMsg3.innerHTML = `Please enter more than 5 characters.`;
  } else {
    errMsg3.innerHTML = "";
  }

  if (date.value.length === 0) {
    errMsg4.innerHTML = `Please select due date.`;
  } else {
    errMsg4.innerHTML = "";
  }

  if (status.value === "") {
    errMsg5.innerHTML = `Please select status.`;
  } else {
    errMsg5.innerHTML = "";
  }
};

// EventHandlers
closeForm.addEventListener("click", clearForm);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isValid();
});
// formData.addEventListener("submit", isValid);
