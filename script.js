(() => {
  const STORAGE_KEY = "taskflow.tasks.v1";
  const commandInput = document.getElementById("command-input");
  const commandForm = document.getElementById("command-form");
  const actionArea = document.getElementById("action-area");
  const taskForm = document.getElementById("task-form");
  const taskName = document.getElementById("task-name");
  const taskId = document.getElementById("task-id");
  const taskIdWrap = document.getElementById("task-id-wrap");
  const actionTitle = document.getElementById("action-title");
  const actionKicker = document.getElementById("action-kicker");
  const saveTask = document.getElementById("save-task");
  const notice = document.getElementById("notice");
  const tableBody = document.getElementById("task-table-body");
  const taskCount = document.getElementById("task-count");
  const exitOverlay = document.getElementById("exit-overlay");
  let tasks = loadTasks();
  let activeAction = null;
  let tasksVisible = false;

  function loadTasks() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      showNotice(
        "Could not save to this browser. Storage may be disabled.",
        true,
      );
    }
  }
  function showNotice(message, isError = false) {
    notice.textContent = message;
    notice.classList.toggle("error", isError);
  }
  function hideAction() {
    actionArea.hidden = true;
    taskForm.reset();
    activeAction = null;
  }
  function openAction(command) {
    showNotice("");
    commandInput.value = String(command);
    if (command === 4) {
      hideAction();
      tasksVisible = true;
      renderTasks();
      showNotice(
        tasks.length
          ? `Showing ${tasks.length} saved task${tasks.length === 1 ? "" : "s"}.`
          : "No tasks yet. Choose 1 to add your first task.",
      );
      return;
    }
    if (command === 1) {
      activeAction = "add";
      actionKicker.textContent = "NEW TASK";
      actionTitle.textContent = "Add a task";
      saveTask.innerHTML = "Add task <span>→</span>";
      taskIdWrap.hidden = true;
      taskName.placeholder = "e.g. Finish my assignment";
    } else if (command === 2) {
      activeAction = "update";
      actionKicker.textContent = "EDIT TASK";
      actionTitle.textContent = "Update a task";
      saveTask.innerHTML = "Update task <span>→</span>";
      taskIdWrap.hidden = false;
      taskName.placeholder = "Type the updated task description";
    } else if (command === 3) {
      activeAction = "delete";
      actionKicker.textContent = "REMOVE TASK";
      actionTitle.textContent = "Delete a task";
      saveTask.innerHTML = "Delete task <span>→</span>";
      taskIdWrap.hidden = false;
      taskName.placeholder = "Optional: confirm task description";
    } else {
      showNotice("Invalid command. Type 1, 2, 3, or 4.", true);
      return;
    }
    actionArea.hidden = false;
    taskId.required = activeAction !== "add";
    taskName.required = activeAction !== "delete";
    taskName.focus();
  }
  function renderTasks() {
    taskCount.textContent = tasks.length;
    if (!tasksVisible) {
      tableBody.innerHTML = `<tr class="empty-row"><td colspan="3"><div class="empty-state"><div class="empty-icon">▤</div><strong>Tasks are hidden for now</strong><span>Type <b>4</b> or choose “Show tasks” to display your list here.</span></div></td></tr>`;
      return;
    }
    if (!tasks.length) {
      tableBody.innerHTML = `<tr class="empty-row"><td colspan="3"><div class="empty-state"><div class="empty-icon">✦</div><strong>Your task list is empty</strong><span>Choose “Add task” or type <b>1</b> to create your first task.</span></div></td></tr>`;
      return;
    }
    tableBody.innerHTML = tasks
      .map(
        (task) =>
          `<tr><td><span class="id-pill">${task.id}</span></td><td><span class="task-text">${escapeHTML(task.text)}</span></td><td><span class="state-pill">Saved</span></td></tr>`,
      )
      .join("");
  }
  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[char],
    );
  }
  commandForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = commandInput.value.trim();
    if (!["1", "2", "3", "4"].includes(raw)) {
      hideAction();
      showNotice("Invalid command. Please type 1, 2, 3, or 4.", true);
      commandInput.focus();
      return;
    }
    openAction(Number(raw));
  });
  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () =>
      openAction(Number(button.dataset.command)),
    );
  });
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = Number(taskId.value);
    const text = taskName.value.trim();
    if (activeAction === "add") {
      if (!text) return showNotice("Please enter a task description.", true);
      const nextId = tasks.length
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1;
      tasks.push({ id: nextId, text });
      persist();
      hideAction();
      showNotice(`Task #${nextId} added. Type 4 to display the task table.`);
    } else if (activeAction === "update") {
      const task = tasks.find((item) => item.id === id);
      if (!Number.isInteger(id) || !task)
        return showNotice(
          "Task ID not found. Type 4 to view the task IDs.",
          true,
        );
      if (!text)
        return showNotice("Please enter the updated task description.", true);
      task.text = text;
      persist();
      hideAction();
      showNotice(`Task #${id} updated. Type 4 to display the updated table.`);
    } else if (activeAction === "delete") {
      const index = tasks.findIndex((item) => item.id === id);
      if (!Number.isInteger(id) || index < 0)
        return showNotice(
          "Task ID not found. Type 4 to view the task IDs.",
          true,
        );
      tasks.splice(index, 1);
      persist();
      hideAction();
      showNotice(`Task #${id} deleted. Type 4 to display the updated table.`);
    }
    renderTasks();
  });
  document
    .getElementById("cancel-action")
    .addEventListener("click", hideAction);
  document
    .getElementById("cancel-action-2")
    .addEventListener("click", hideAction);
  document.getElementById("exit-button").addEventListener("click", () => {
    hideAction();
    exitOverlay.hidden = false;
  });
  document.getElementById("restart-button").addEventListener("click", () => {
    exitOverlay.hidden = true;
    showNotice("Welcome back! Choose a command to continue.");
    commandInput.focus();
  });
  renderTasks();
})();
