const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `
    <div class="card-list" data-task-id="${id}">
    <div class="card shadow-sm p-2 mb-3">
      <div class="card-body">
        <!-- Task name --------------->
        <div class="row mb-3 align-items-start justify-content-between">
          <h5 class="card-title col-8">${name}</h5>
          <span class="col-3 badge pb-1 text-capitalize me-3 ${
            status === 'todo'
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
          <h6 class="card-subtitle mb-2 text-muted">Assigned to: ${assignedTo}</h6>
        </div>
        <!-- Description -------------->
        <div class="row mb-3">
          <p class="card-text">
            ${description}
          </p>
        </div>
        <!-- Date, edit and delete buttons ---->
        <div class="row align-items-center">
          <div class="col text-primary">${dueDate}</div>
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
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  addTask(name, description, assignedTo, dueDate, status) {
    let id = this.currentId++;
    this.tasks.push({
      id,
      name,
      description,
      assignedTo,
      dueDate,
      status,
    });
  }

  render() {
    let doneHtmlList = [];
    let reviewHtmlList = [];
    let todoHtmlList = [];
    let inprogressHtmlList = [];
    // let todoHtmlList = [];

    this.tasks.forEach(task => {
      let date = new Date(task.dueDate);
      let formattedDate = date.toLocaleDateString();
      let taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );

      if (task.status === 'review') {
        reviewHtmlList.push(taskHtml);
      } else if (task.status === 'todo') {
        todoHtmlList.push(taskHtml);
      } else if (task.status === 'in progress') {
        inprogressHtmlList.push(taskHtml);
      } else {
        doneHtmlList.push(taskHtml);
      }
      // tasksHtmlList.push(taskHtml);
      let reviewHtml = reviewHtmlList.join('\n');
      document.getElementById('review').innerHTML = reviewHtml;
      let todoHtml = todoHtmlList.join('\n');
      document.getElementById('todo').innerHTML = todoHtml;
      let inprogressHtml = inprogressHtmlList.join('\n');
      document.getElementById('inprogress').innerHTML = inprogressHtml;
      let doneHtml = doneHtmlList.join('\n');
      document.getElementById('done').innerHTML = doneHtml;
    });

    // let tasksHtml = tasksHtmlList.join('\n');

    // let tasksHtmlList = [];
    // for (let i = 0; i < this.tasks.length; i++) {
    //   let task = this.tasks[i];
    //   // console.log(task)
    //   let date = new Date(task.dueDate);
    //   let formattedDate = date.toLocaleDateString();
    //   let taskHtml = createTaskHtml(
    //     task.id,
    //     task.name,
    //     task.description,
    //     task.assignedTo,
    //     formattedDate,
    //     task.status
    //   );
    //   tasksHtmlList.push(taskHtml);
    // }
    // let tasksHtml = tasksHtmlList.join('\n');
    // document.getElementById('taskList').innerHTML = tasksHtml;
  }

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
  load() {
    // check if any tasks are saved in localStorage
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
  getTaskById(taskId) {
    let foundTask;
    this.tasks.find(task => {
      if (task.id === taskId) {
        foundTask = task;
        // console.log(foundTask);
      }
    });
    return foundTask;
  }
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
