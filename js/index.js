"use strict";
const taskManager = new TaskManager();
// taskManager.addTask('test', 'something', 'marc', 'may 25th', 'pending');
// taskManager.addTask('test', 'something', 'marc', 'may 25th', 'pending');
// console.log(taskManager.tasks);
let taskHtml = createTaskHtml(
  "test",
  "something",
  "marc",
  "may 25th",
  "pending"
);
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
const checkInput = (input) => {
  if (!(input.length < 5)) return ``;
  else return `Please enter more than 5 characters.`;
};
const checkSelect = (input) => {
  if (!(input.length === 0)) return ``;
  else return `Please select.`;
};
// EventHandlers
closeBtn.addEventListener("click", clearForm);
formData.addEventListener("submit", function (e) {
  // Get data from form
  const task = taskName.value;
  const desc = description.value;
  const assigedTo = assigned.value;
  const dueDate = date.value;
  const state = status.value;
  errMsg1.innerHTML = checkInput(task);
  errMsg2.innerHTML = checkInput(desc);
  errMsg3.innerHTML = checkInput(assigedTo);
  errMsg4.innerHTML = checkSelect(dueDate);
  errMsg5.innerHTML = checkSelect(state);
  if (
    task.length > 5 &&
    desc.length > 5 &&
    assigedTo.length > 5 &&
    dueDate.length !== 0 &&
    state.value !== 0
  ) {
    taskManager.addTask(task, desc, assigedTo, dueDate, state);
    clearForm();
    // console.log(taskManager.tasks);
    console.log("submitted successfully");
  } else {
    e.preventDefault();
  }
});