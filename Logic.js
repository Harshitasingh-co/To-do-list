
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    document.addEventListener("DOMContentLoaded", loadTasks);

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") return alert("Please enter a task!");

      const task = { text: taskText, completed: false };
      saveTask(task);
      renderTask(task);

      taskInput.value = "";
    }

    function renderTask(task) {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      const span = document.createElement("span");
      span.textContent = task.text;
      span.addEventListener("click", () => toggleTask(li, task));

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.addEventListener("click", () => removeTask(li, task));

      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);

      taskList.appendChild(li);
    }

    function saveTask(task) {
      const tasks = getTasks();
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function getTasks() {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function loadTasks() {
      const tasks = getTasks();
      tasks.forEach(renderTask);
    }

    function toggleTask(li, task) {
      li.classList.toggle("completed");
      task.completed = !task.completed;
      updateTasks();
    }

    function removeTask(li, task) {
      li.remove();
      const tasks = getTasks().filter((t) => t.text !== task.text);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTasks() {
      const updated = [];
      document.querySelectorAll("li").forEach((li) => {
        updated.push({
          text: li.querySelector("span").textContent,
          completed: li.classList.contains("completed"),
        });
      });
      localStorage.setItem("tasks", JSON.stringify(updated));
    }

