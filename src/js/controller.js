// imports view and model object
import modelObj from "./model.js";
import viewObj from "./view.js";

// try to syc both the user interface and model data
class App {
  run() {
    // render the initial data
    const tasks = modelObj.getTasks();
    viewObj.render(tasks);

    // registers event
    viewObj.formEventHandler(this.formEventController);
    viewObj.closeButtonEventHandler(this.closeBtnController);
    viewObj.checkButtonEventHandler(this.checkBtnController);
  }

  formEventController(taskName) {
    return modelObj.addTask(taskName);
  }

  closeBtnController(taskId) {
    // responsible for calling the model remove task function
    modelObj.removeTask(taskId);
  }

  checkBtnController(taskId) {
    modelObj.updateStatus(taskId);
    console.log(modelObj.getTasks());
  }
}

export default App;
