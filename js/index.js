const taskManager = new TaskManager();

// taskManager.addTask('test', 'something', 'marc', 'may 25th', 'pending');

// taskManager.addTask('test', 'something', 'marc', 'may 25th', 'pending');

// console.log(taskManager.tasks);

let taskHtml = createTaskHtml('test', 'something', 'marc', 'may 25th', 'pending');
console.log(taskHtml);