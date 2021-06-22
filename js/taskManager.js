const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `
    <div class="card-list" data-task-id="${id}">
    <div class="card card-shadow p-2 mb-3">

      <div class="card-body">
        <!-- Task name --------------->
        <div class="row mb-3 align-items-start justify-content-between">
          <span class="col-7">
            <h5 class="card-subtitle card-heading-primary mb-1">Task: </h5>
            <p class="text-secondary">${name}</p>
          </span>
          
          <span class="col-4 badge pb-1 text-capitalize me-3 ${
            status === 'to-do'
              ? 'bg-success'
              : status === 'review'
              ? 'bg-danger'
              : status === 'in progress'
              ? 'bg-warning text-dark'
              : status === 'done'
              ? ' bg-secondary'
              : ''
          }
          ">${status}</span>
        </div>
        <!-- Assigned to -------------->
        <div class="row mb-3">
          <div class="col">
            <h6 class="card-subtitle card-heading-primary mb-1 ">Assigned to: </h6>
            <p class="text-secondary">${assignedTo}</p>
          </div>
          
        </div>
        <!-- Description -------------->
        <div class="row mb-3">
          <h6 class="card-subtitle card-heading-primary mb-1 ">Description: </h6>
          <p class="card-text text-secondary">
            ${description}
          </p>
        </div>
        <!-- Date, edit and delete buttons ---->
        <div class="row align-items-center">
          <h6 class="card-subtitle card-heading-primary mb-1 ">Due date: </h6>
          <p class="card-text text-primary">
          ${dueDate}
          </p>
          
          <div class="col d-flex justify-content-end">
           ${
             status === 'done'
               ? ''
               : '<span class="d-flex align-items-center" id="done-container"><button type="button" class="btn btn-outline-secondary btn-sm done-button">Done</button></span>'
           }
            <span class="d-flex justify-content-center "><i class="bi bi-x-lg icon-btn delete-button"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  return html;
};
class TaskManager {

  // Properties
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  // Methods
  // Add task method
  addTask(name, description, assignedTo, dueDate, status) {
    // increment id
    let id = this.currentId++;

    // push to tasks array
    this.tasks.push({
      id,
      name,
      description,
      assignedTo,
      dueDate,
      status,
    });
  }

  // Render Method
  render() {
    // declare status arrays to categorise each task
    let doneHtmlList = [];
    let reviewHtmlList = [];
    let todoHtmlList = [];
    let inprogressHtmlList = [];


    this.tasks.forEach(task => {
      // Date objects contain a Number that represents milliseconds since 1 January 1970 UTC e.g. Sun Dec 17 1995 03:24:00 GMT...
      let date = new Date(task.dueDate);
      // format date to readable string e.g. 01/07/2021
      let formattedDate = date.toLocaleDateString();
      // pass values into create html card function
      let taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );

      // Push cards into approriate status array
      if (task.status === 'review') {
        reviewHtmlList.push(taskHtml);
      } else if (task.status === 'to-do') {
        todoHtmlList.push(taskHtml);
      } else if (task.status === 'in progress') {
        inprogressHtmlList.push(taskHtml);
      } else {
        doneHtmlList.push(taskHtml);
      }
    });

    // Join cards and insert them into the approriate div tag
    let reviewHtml = reviewHtmlList.join('\n');
    document.getElementById('review').innerHTML = reviewHtml;
    let todoHtml = todoHtmlList.join('\n');
    document.getElementById('todo').innerHTML = todoHtml;
    let inprogressHtml = inprogressHtmlList.join('\n');
    document.getElementById('inprogress').innerHTML = inprogressHtml;
    let doneHtml = doneHtmlList.join('\n');
    document.getElementById('done').innerHTML = doneHtml;
  }

  // Save Method
  save() {
    // Create a string for all tasks
    let tasksJson = JSON.stringify(this.tasks);
    // Store the string variable in local storage under key 'tasks'
    localStorage.setItem('tasks', tasksJson);
    // convert currentId to stirng
    let currentId = JSON.stringify(this.currentId);
    // Store the string variable in local storage under key 'currentId'
    localStorage.setItem('currentId', currentId);
  }

  // Load Method
  load() {
    // check if any tasks are saved or exists in localStorage, error will produce if its empty
    if (localStorage.getItem('tasks') !== null) {
      const tasksJson = localStorage.getItem('tasks');
      // Convert the tasksJson string to an array and store it in this.tasks
      this.tasks = JSON.parse(tasksJson);
    }
    // check if the currentId is saved in localStorage
    if (localStorage.getItem('currentId') !== null) {
      const currentId = localStorage.getItem('currentId');
      //Convert the currentId to a number before storing in this.currentId
      this.currentId = parseInt(currentId);
    }
  }

  // Get task by the id
  getTaskById(taskId) {
    let foundTask;
    this.tasks.find(task => {
      if (task.id === taskId) {
        foundTask = task;
      }
    });
    return foundTask;
  }

  // Delete task by id
  deleteTask(taskId) {
    let newTasks = [];
    this.tasks.forEach(task => {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    });
    this.tasks = newTasks;
  }
}
