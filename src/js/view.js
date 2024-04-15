// responsible for render and updating the dom (user interface)

class View {
  _formEl = document.querySelector(".todo_form");
  _submitBtn = document.querySelector(".submit_btn");
  _todoInput = document.querySelector(".todo_input_text");
  _todoListEl = document.querySelector(".todo_list");
  _closeBtn = document.querySelectorAll(".close_btn");
  _checkBtn = document.querySelector(".check_btn");
  _data;

  // public methods

  render(data) {
    // list of all the tasks to be rendered
    this._data = data;

    this._generateMarkup();
  }

  _generateMarkup() {
    // prettier-ignore
    const markup = this._data.map((element) => {
            return ` <li class="todo_list_item ${
              element.completed ? "list_selected" : "" }" data-task_id="${element._id}">
                <i class="fa-regular fa-circle check_btn ${
                  element.completed ? "icon_selected" : ""
                } "></i> ${element.taskName}
                <i class="fa-solid fa-x close_btn"></i>
               </li>`;
          })
          .join(" ");

    this._clear();
    this._todoListEl.insertAdjacentHTML("afterbegin", markup);
  }

  formEventHandler(handler) {
    this._formEl.addEventListener(
      "submit",
      function (e) {
        // prevent it from submitting to server
        e.preventDefault();

        // get the value
        const dataEntry = new FormData(this._formEl);

        const dataObj = Object.fromEntries(dataEntry);

        const taskName = dataObj.task_name;

        const taskObj = handler(taskName);
        this._addTask(taskObj);
        this._todoInput.value = "";
      }.bind(this)
    );
  }

  _addTask(taskObj) {
    const markup = ` <li class="todo_list_item ${
      taskObj.completed ? "list_selected" : ""
    }" data-task_id="${taskObj._id}">
          <i class="fa-regular fa-circle check_btn ${
            taskObj.completed ? "icon_selected" : ""
          } "></i> ${taskObj.taskName}
          <i class="fa-solid fa-x close_btn"></i>
         </li>`;
    this._todoListEl.insertAdjacentHTML("beforeend", markup);
  }

  closeButtonEventHandler(handler) {
    this._todoListEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("close_btn")) return;

      // obtaining the task to be deleted
      const parentList = e.target.closest("li");
      const taskId = parentList.dataset.task_id;

      // remove it from the dom
      this.removeChild(parentList);

      // remove it from the data itself
      handler(taskId);
    });
  }

  checkButtonEventHandler(handler) {
    this._todoListEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("check_btn")) return;

      const parentList = e.target.closest("li");
      const taskId = parentList.dataset.task_id;

      parentList.classList.toggle("list_selected");
      e.target.classList.toggle("icon_selected");

      // model related
      handler(taskId);
    });
  }

  _clear() {
    this._todoListEl.textContent = "";
  }
}

export default new View();
