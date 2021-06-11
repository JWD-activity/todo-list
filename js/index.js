'use strict';
const taskManager = new TaskManager();

// console.log(taskManager.tasks);
// let taskHtml = createTaskHtml(
//   "test",
//   "something",
//   "marc",
//   "may 25th",
//   "pending"
// );

taskManager.render();
// Element seletors
const closeForm = document.getElementById('closeForm');
const submitForm = document.getElementById('submitForm');
const formData = document.getElementById('fromData');
const taskName = document.getElementById('name');
const description = document.getElementById('description');
const assigned = document.getElementById('assigned');
const date = document.getElementById('date');
const status = document.getElementById('status');
const btnAdd = document.getElementById('addBtn');
const errMsg = document.getElementById('errMsg');
const submitBtn = document.getElementById('submitBtn');
const addTaskBtn = document.getElementById('addTask');
const Modal = document.getElementById('exampleModal');

// Founctions
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
};
const checkInput = input => {
  if (!(input.trim().length <= 5)) return ``;
  else return `Please enter more than 5 characters.`;
};
const checkSelect = input => {
  if (!(input.length === 0)) return ``;
  else return `Please select.`;
};
// EventHandlers
closeBtn.addEventListener('click', clearForm);
// addTaskBtn.addEventListener('click', function(){
//     submitBtn.setAttribute('data-dismiss', '');
// })
$('#exampleModal').on('hidden.bs.modal', clearForm);

formData.addEventListener('submit', function (e) {
  // https://stackoverflow.com/questions/35552813/call-function-with-bootstrap-submit-button
  e.preventDefault();

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
  console.log(state);

  if (
    task.length > 5 &&
    desc.length > 5 &&
    assigedTo.length > 5 &&
    dueDate.length !== 0 &&
    state.length !== 0
  ) {
    taskManager.addTask(task, desc, assigedTo, dueDate, state);
    // $('#exampleModal').modal().hide()
    // modal('hide') not working
    // $('body').removeClass('modal-open');
    $('.btn-closemodal').trigger('click');
    // $('.modal-backdrop').remove();
    taskManager.render();
    clearForm();

    // console.log(taskManager.tasks);
    // console.log("submitted successfully");
  }
});
// function closeModal(){
//     Modal.style.display = "none"
// }
// submitBtn.addEventListener('click', closeModal)
