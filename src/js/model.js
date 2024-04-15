// responsible for maintaining the state of the application(data related tasks)

// representation of the data

/*
    _id : 343nf274j2349 : string
    taskName : cycling : string,
    completed : true | false  : boolean
*/

class Model {
  _taskData = [];

  constructor() {
    const data = window.localStorage.getItem("tasks");
    const tasks = JSON.parse(data);
    if (tasks) this._taskData = tasks;
  }

  getTasks() {
    return this._taskData;
  }

  addTask(taskName) {
    const taskObj = {
      _id: this._generateRandomId(),
      taskName: taskName,
      completed: false,
    };
    this._taskData.push(taskObj);
    this._persistData();
    this._initialData;
    return taskObj;
  }

  removeTask(taskId) {
    const taskToRemove = this._taskData.find((task) => task._id == taskId);
    const indx = this._taskData.indexOf(taskToRemove);
    this._taskData.splice(indx, 1);
    this._persistData();
  }

  updateStatus(taskId) {
    const task = this._taskData.find((ele) => ele._id == taskId);

    if (task.completed) task.completed = false;
    else task.completed = true;
    this._persistData();
  }

  _generateRandomId() {
    const randomIdLength = 10;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv123456789@!#$%^&*()<>";
    const charactersLength = characters.length - 1;

    let res = "";

    for (let i = 0; i < randomIdLength; i++) {
      let randIndx = Math.round(Math.random() * charactersLength);
      res += characters[randIndx];
    }

    return res;
  }

  // persist the data
  _persistData() {
    // add the data to the local storage

    window.localStorage.setItem("tasks", JSON.stringify(this._taskData));
  }
}

export default new Model();
