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
const taskList = document.getElementById('taskList');

// Functions
// Clear form
const clearForm = () => {

  // clear each input
  taskName.value = 
  description.value =
    assigned.value =
    date.value =
    status.value =
      '';

      // clear all error messages
  errMsg1.textContent =
    errMsg2.textContent =
    errMsg3.textContent =
    errMsg4.textContent =
    errMsg5.textContent =
      '';


// spread form elements into an array to do a forEach, to remove bootsrap classes when the form is cleared
  [...formElements].forEach(el => {
    el.classList.remove('is-valid');
    el.classList.remove('is-invalid');
  });
};


// FUNCTIONS FOR SHOWING ERROR MESSAGES IN REAL TIME

// Check text input
const checkText = input => {
  // remove white space from input and check length is greater than 5
  if (input.value.trim().length > 5) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    // no error message
    return ``;
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    // error message is displayed
    return `Please enter more than 5 characters.`;
  }
};

// Check status
const checkStatus = input => {
  // if a status is selected
  if (!(input.value.length === 0)) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return ``;
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    // return error if status not selected
    return `Please select status.`;
  }
};

// Check date
const checkDate = input => {
  let today = new Date();

  let dateSelected = new Date(input.value);

  // set time 00:00:00, since we only want date
dateSelected.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);


  if (input.value.length !== 0) {
    // if the date is selected from past date show error (past date smaller than today), else no error
    if (dateSelected < today) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      return `invalid date, select again.`;
    } else {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      return ``;
    }
  } else {
      // if a date is not slected
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    return `Please select due date.`;
  }
};

// FUNCTIONS FOR CHECKING INPUTS WHEN SUBMIT BUTTON IS CLICKED
// Check valid text - When you click submit everything is validated and are allowed to submit
// 'every' checks every element to be greater than 5 characters
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

// close button handler - clears the form on close
closeBtn.addEventListener('click', clearForm);
// form elements handler - as soon as changes are made in the inputs it validates each one
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
    // check validation of inputs
    validText(task, desc, assigedTo) &&
    validStatus(state) &&
    validDate(date)
  ) {
    taskManager.addTask(task, desc, assigedTo, date.value, state);
    taskManager.save();
    // close modal after submit
    $('.btn-closemodal').trigger('click');
    taskManager.render();
    clearForm();
  }
});

taskList.addEventListener('click', event => {
  // if theres a done button
  if (event.target.classList.contains('done-button')) {
    // find the closest element with class card-list
    const parentTask = event.target.closest('.card-list');
     // Use data attributes to access dataset which gives us the id 
     // data-task-id in html = dataset.taskId in javascript
    let taskId = Number(parentTask.dataset.taskId);

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
