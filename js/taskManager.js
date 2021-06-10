const createTaskHtml = (name, description, assignedTo, dueDate, status)  => {
    const html = `
    <div class="col-xl-4 col-md-6 col-sm-12">
    <div class="card shadow-sm p-2 mb-3">
      <div class="card-body">
        <!-- Task name --------------->
        <div class="row mb-3">
          <div class="card-title d-flex justify-content-between">
            <h5 class="d-inline">${name}</h5>
            <span class="badge bg-danger pb-1">${status}</span>
          </div>
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
        <div class="row">
          <div class="col text-primary">${dueDate}</div>
          <div class="col d-flex justify-content-end">
            <span><i class="bi bi-pencil icon-btn"></i></span>
            <span><i class="bi bi-x-lg icon-btn"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    return html;
}


class TaskManager {
    constructor(currentId = 0){
        this.tasks = [];
        this.currentId = currentId;
    }


    addTask(name, description, assignedTo, dueDate, status) {
       let id =  this.currentId++;
        this.tasks.push({
            id,
            name,
            description,
            assignedTo,
            dueDate,
            status
        })
    }

    render() {
        let tasksHtmlList = [];
        for (let i=0; i<this.tasks.length; i++) {
           let task = this.tasks[i];
            // console.log(task)

          let date = new Date(task.dueDate);
        let formattedDate = date.toString();
        let taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, formattedDate, task.status);

        tasksHtmlList.push(taskHtml);
        
        }

        let tasksHtml = tasksHtmlList.join('\n');
        document.getElementById('taskList').innerHTML = tasksHtml;

        
    }


}


