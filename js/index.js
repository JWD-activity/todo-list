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
const assignedTo = document.getElementById('assigned');
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


// Check input of form and show an error message if invalid

// Check text input function
const checkInput = () => {
  const task = taskName.value.trim();
  const desc = description.value.trim();
  const assignedTrimmed = assigned.value.trim();
  let today = new Date();
  let dateSelected = new Date(date.value);
  let isValid = [];
  // set time 00:00:00, since we only want date
dateSelected.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);

  



// CHECK TASK NAME INPUT

  // remove white space from input and check length is greater than 5
  if (task.length > 5) {
   taskName.classList.add('is-valid');
   taskName.classList.remove('is-invalid');
    // // no error message
    setSuccessFor(taskName, '')
    console.log(1);
    isValid.push(true);
  } else {
   taskName.classList.remove('is-valid');
   taskName.classList.add('is-invalid');
    // error message is displayed
    setErrorFor(taskName, `Please enter more than 5 characters.`);
    isValid.push(false);
  }

  // CHECK DESCRIPTION INPUT
  if (desc.length > 5) {
   description.classList.add('is-valid');
   description.classList.remove('is-invalid');
    // // no error message
    setSuccessFor(description, '')
    isValid.push(true);
  } else {
  description.classList.remove('is-valid');
  description.classList.add('is-invalid');
    setErrorFor(description, `Please enter more than 5 characters.`);
    isValid.push(false);
  }


// CHECK ASSIGNEDTO INPUT
  if (assignedTrimmed.length > 5) {
    assignedTo.classList.add('is-valid');
    assignedTo.classList.remove('is-invalid');
    // // no error message
    setSuccessFor(assignedTo, '')
    isValid.push(true);
  } else {
    assignedTo.classList.remove('is-valid');
    assignedTo.classList.add('is-invalid');
    setErrorFor(assignedTo, `Please enter more than 5 characters.`);
    isValid.push(false);
  }

  // CHECK STATUS INPUT
  if (status.value.length > 0) {
    status.classList.add('is-valid');
    status.classList.remove('is-invalid');  
    setSuccessFor(status, '');
    isValid.push(true);
  } else {
    status.classList.remove('is-valid');
    status.classList.add('is-invalid');
    // return error if status not selected
    setErrorFor(status, `Please select status`);
    isValid.push(false);
  }

  // CHECK DATE INPUT
  if (date.value.length !== 0) {
    // if the date is selected from past date show error (past date smaller than today), else no error
    if (dateSelected < today) {
      date.classList.remove('is-valid');
      date.classList.add('is-invalid');
      setErrorFor(date, `invalid date, select again.`);
      isValid.push(false);
    } else {
      date.classList.add('is-valid');
      date.classList.remove('is-invalid');
      setSuccessFor(date, '');
      isValid.push(true);
    }
  } else {
      // if a date is not selected
    date.classList.remove('is-valid');
    date.classList.add('is-invalid');
    setErrorFor(date, `Please select due date.`);
    console.log("-");
    isValid.push(false);
  }

  console.log(isValid);
return isValid;

};


// Error Message functions
const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const errMsgDiv = formControl.querySelector('.errMessage');

  errMsgDiv.innerText = message;

}

const setSuccessFor = (input, message) => {
  const formControl = input.parentElement;
  const errMsgDiv = formControl.querySelector('.errMessage');

  errMsgDiv.innerText = message;  
}


// EventHandlers

// close button handler - clears the form on close
closeBtn.addEventListener('click', clearForm);
// form elements handler - as soon as changes are made in the inputs it validates each one
[...formElements].forEach(el => {
  el.addEventListener('change', checkInput);
});

// submit button handler
formData.addEventListener('submit', function (e) {
  // https://stackoverflow.com/questions/35552813/call-function-with-bootstrap-submit-button
  e.preventDefault();
  // Get data from form 
  const task = taskName.value.trim();
  const desc = description.value.trim();
  const assignedTo = assigned.value.trim();
  const state = status.value;

  // checkOnChange();

  // if (
  //   // check validation of inputs
  // checkText() &&
  //   validStatus(state) &&
  //   validDate(date)
  // ) {

  
    if(checkInput().every(input=>input===true)){

      taskManager.addTask(task, desc, assignedTo, date.value, state);
      taskManager.save();
      // close modal after submit
      $('.btn-closemodal').trigger('click');
      taskManager.render();
      clearForm();

    }     
  });


// Handler to remove done button and delete a task
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
