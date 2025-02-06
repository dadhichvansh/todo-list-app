import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.querySelector("#task-list");
  const newTaskButton = document.querySelector("#new-task-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Add a new task
  newTaskButton.addEventListener("click", () => {
    const taskText = prompt("Enter your new task:");
    if (taskText) addTask(taskText);
  });

  // Function to add a new task
  function addTask(text) {
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

    // Toggle task completion and disable/enable delete button
    checkbox.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      taskItem.classList.toggle("line-through", isChecked);
      deleteBtn.disabled = isChecked;
      deleteBtn.classList.toggle("opacity-50", isChecked); // Apply opacity when disabled
    });

    // Delete task if unchecked
    deleteBtn.addEventListener("click", () => {
      if (!checkbox.checked) taskItem.remove();
    });

    taskList.appendChild(taskItem);
  }

  // Filter tasks
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.textContent.toLowerCase();
      document.querySelectorAll(".task-item").forEach((task) => {
        const isChecked = task.querySelector(".task-checkbox").checked;
        task.style.display =
          filter === "all" ||
          (filter === "open" && !isChecked) ||
          (filter === "closed" && isChecked)
            ? "flex"
            : "none";
      });
    });
  });
});
