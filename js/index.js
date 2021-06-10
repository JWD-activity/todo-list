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

("use strict");
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
  if (!(input.value.length < 5)) return ``;
  else return `Please enter more than 5 characters.`;
};

const checkSelect = (input) => {
  if (!(input.value.length === 0)) return ``;
  else return `Please select.`;
};

const isValid = () => {
  errMsg1.innerHTML = checkInput(taskName);
  errMsg2.innerHTML = checkInput(description);
  errMsg3.innerHTML = checkInput(assigned);
  errMsg4.innerHTML = checkSelect(date);
  errMsg5.innerHTML = checkSelect(status);
};

// EventHandlers
closeForm.addEventListener("click", clearForm);

submitBtn.addEventListener("click", (e) => {
    
  e.preventDefault();
  isValid();
});
// formData.addEventListener("submit", isValid);
