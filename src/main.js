import "/src/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.querySelector("#task-list");
  const newTaskButton = document.querySelector("#new-task-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Load tasks from localStorage on page load
  const loadTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach((task) => {
      addTask(task.text, task.isChecked);
    });
  };

  // Save tasks to localStorage
  const saveTasksToLocalStorage = () => {
    const tasks = [...document.querySelectorAll(".task-item")].map(
      (taskItem) => ({
        text: taskItem.querySelector(".task-text").textContent,
        isChecked: taskItem.querySelector(".task-checkbox").checked,
      })
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add a new task
  const addTask = (text, isChecked = false) => {
    const taskItem = document.createElement("div");
    taskItem.className =
      "task-item m-5 bg-white p-4 py-3 flex justify-between items-center rounded-xl";

    taskItem.innerHTML = `
        <div class="flex items-center gap-4">
          <input type="checkbox" class="task-checkbox w-4 h-4 sm:w-5 sm:h-4 cursor-pointer rounded" />
          <h3 class="task-text text-lg">${text}</h3>
        </div>
        <button class="delete-btn p-1 rounded hover:bg-blue-300 transition duration-500">
          <img src="/assets/cross-icon.png" alt="cross-icon" class="w-2 h-2 sm:w-3 sm:h-3" />
        </button>
      `;

    const checkbox = taskItem.querySelector(".task-checkbox");
    const deleteBtn = taskItem.querySelector(".delete-btn");

    checkbox.checked = isChecked;
    if (isChecked) {
      taskItem.classList.add("line-through");
      deleteBtn.disabled = true;
      deleteBtn.classList.add("opacity-50");
    }

    checkbox.addEventListener("change", (e) => {
      const checked = e.target.checked;
      taskItem.classList.toggle("line-through", checked);
      deleteBtn.disabled = checked;
      deleteBtn.classList.toggle("opacity-50", checked);
      saveTasksToLocalStorage();
    });

    deleteBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        taskItem.remove();
        saveTasksToLocalStorage();
      }
    });

    taskList.appendChild(taskItem);
    saveTasksToLocalStorage();
  };

  // Filter tasks
  const filterTasks = () => {
    const activeFilter = document.querySelector(".filter-btn.text-blue-600")
      .dataset.filter;
    document.querySelectorAll(".task-item").forEach((task) => {
      const isChecked = task.querySelector(".task-checkbox").checked;
      task.style.display =
        activeFilter === "all" ||
        (activeFilter === "open" && !isChecked) ||
        (activeFilter === "closed" && isChecked)
          ? "flex"
          : "none";
    });
  };

  // Handle new task button click
  newTaskButton.addEventListener("click", () => {
    const taskText = prompt("Enter your new task:");
    if (taskText) addTask(taskText);
  });

  // Handle filter button clicks
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) =>
        b.classList.remove("text-blue-600", "font-semibold")
      );
      btn.classList.add("text-blue-600", "font-semibold");
      filterTasks();
    });
  });

  loadTasksFromLocalStorage();
});
