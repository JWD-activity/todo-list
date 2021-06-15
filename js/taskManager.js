const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
  const html = `
    <div class="col-xl-4 col-md-6 col-sm-12">
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
            <span class="d-flex align-items-center"><button type="button" class="btn btn-outline-secondary btn-sm done-button">Done</button></span>
            <span class="d-flex justify-content-center "><i class="bi bi-x-lg icon-btn"></i></span>            
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
    let tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      // console.log(task)

      let date = new Date(task.dueDate);
      let formattedDate = date.toLocaleDateString();
      let taskHtml = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );


      tasksHtmlList.push(taskHtml);
    }

    
    let tasksHtml = tasksHtmlList.join('\n');
    document.getElementById('taskList').innerHTML = tasksHtml;
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
}
