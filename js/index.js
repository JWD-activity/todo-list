'use strict';
// Create taskManager instance
const taskManager = new TaskManager();
// Check local storge
taskManager.load();
// Render display on page
taskManager.render();
// Element seletors
const closeForm = document.getElementById('closeForm');
const submitForm = document.getElementById('submitForm');
const formData = document.getElementById('formData');
const taskName = document.getElementById('name');
const description = document.getElementById('description');
const assigned = document.getElementById('assigned');
const date = document.getElementById('date');
const status = document.getElementById('status');
const btnAdd = document.getElementById('addBtn');
const errMsg = document.getElementById('errMsg');
const submitBtn = document.getElementById('submitBtn');
const addTaskBtn = document.getElementById('addTask');
const formElements = document.getElementsByClassName('form-control');

// Functions
// Clear form
const clearForm = () => {
  taskName.value =
    description.value =
    assigned.value =
    date.value =
    status.value =
      '';

  errMsg1.textContent =
    errMsg2.textContent =
    errMsg3.textContent =
    errMsg4.textContent =
    errMsg5.textContent =
      '';

  [...formElements].forEach(el => {
    el.classList.remove('is-valid');
    el.classList.remove('is-invalid');
  });
};

// Check text input
const checkText = input => {
  if (input.value.trim().length > 5) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return ``;
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    return `Please enter more than 5 characters.`;
  }
};

// Check status
const checkStatus = input => {
  if (!(input.value.length === 0)) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return ``;
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    return `Please select status.`;
  }
};

// Check date
const checkDate = input => {
  let today = new Date();
  let dateSelected = new Date(input.value);
  // set time 00:00:00
  dateSelected.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (input.value.length !== 0) {
    if (today > dateSelected) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      return `invalid date, select again.`;
    } else {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      return ``;
    }
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    return `Please select due date.`;
  }
};

// Check valid text
const validText = (...inputs) => inputs.every(input => input.length > 5);

// Check valid status
const validStatus = input => {
  if (input.length !== 0) return true;
  else return false;
};

// Check valid date
const validDate = input => {
  if (checkDate(input) === '') return true;
  else return false;
};

// Check onchange and render error message
const checkOnChange = () => {
  errMsg1.innerHTML = checkText(taskName);
  errMsg2.innerHTML = checkText(description);
  errMsg3.innerHTML = checkText(assigned);
  errMsg4.innerHTML = checkDate(date);
  errMsg5.innerHTML = checkStatus(status);
};

// EventHandlers
// close button handler
closeBtn.addEventListener('click', clearForm);
// form elements handler
[...formElements].forEach(el => {
  el.addEventListener('change', checkOnChange);
});
// submit button handler
formData.addEventListener('submit', function (e) {
  // https://stackoverflow.com/questions/35552813/call-function-with-bootstrap-submit-button
  e.preventDefault();
  // Get data from form
  const task = taskName.value.trim();
  const desc = description.value.trim();
  const assigedTo = assigned.value.trim();
  const state = status.value;

  checkOnChange();

  if (
    validText(task, desc, assigedTo) &&
    validStatus(state) &&
    validDate(date)
  ) {
    taskManager.addTask(task, desc, assigedTo, date.value, state);
    taskManager.save();
    $('.btn-closemodal').trigger('click');
    taskManager.render();
    clearForm();
  }
});

taskList.addEventListener('click', event => {
  if (event.target.classList.contains('done-button')) {
    const parentTask = event.target.closest('.card-list');
    let taskId = Number(parentTask.dataset.taskId);
    console.log(parentTask);
    console.log(taskId);
    const task = taskManager.getTaskById(taskId);
    task.status = 'done';
    taskManager.save();
    taskManager.render();
  }

  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.closest('.card-list');
    let taskId = Number(parentTask.dataset.taskId);

    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});
