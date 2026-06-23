requireLogin();

const params    = new URLSearchParams(window.location.search);
const projectId = params.get("id");
if (!projectId) window.location.href = "/dashboard.html";

const taskList   = document.getElementById("task-list");
const createForm = document.getElementById("create-task-form");
const errorMsg   = document.getElementById("error-msg");
const filterStatus   = document.getElementById("filter-status");
const filterPriority = document.getElementById("filter-priority");

let currentPage = 1;
const limit = 20;

async function loadProject() {
  try {
    const res = await API.get(`/projects/${projectId}`);
    const p = res.data.project;
    document.getElementById("project-name").textContent = p.name;
    document.getElementById("project-desc").textContent = p.description || "";
    document.getElementById("project-status").textContent = p.status;
  } catch (ex) {
    document.getElementById("project-header").innerHTML = `<p class="error">${ex.message}</p>`;
  }
}

async function loadTasks(page = 1) {
  const status   = filterStatus.value;
  const priority = filterPriority.value;
  let qs = `?page=${page}&limit=${limit}`;
  if (status)   qs += `&status=${status}`;
  if (priority) qs += `&priority=${priority}`;

  try {
    const res = await API.get(`/projects/${projectId}/tasks${qs}`);
    renderTasks(res.data.tasks, res.pagination);
    currentPage = page;
  } catch (ex) {
    taskList.innerHTML = `<p class="error">${ex.message}</p>`;
  }
}

function renderTasks(tasks, pagination) {
  if (!tasks.length) {
    taskList.innerHTML = "<p>No tasks yet.</p>";
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  taskList.innerHTML = tasks.map((t) => `
    <div class="card task-card priority-${t.priority}" onclick="window.location.href='/task.html?id=${t.id}'">
      <h4>${esc(t.title)}</h4>
      <span class="badge badge-${t.status}">${t.status.replace("_", " ")}</span>
      <span class="badge badge-priority">${t.priority}</span>
      ${t.assignee_name ? `<small>Assigned to: ${esc(t.assignee_name)}</small>` : ""}
    </div>
  `).join("");

  const total = pagination.pages;
  document.getElementById("pagination").innerHTML = Array.from({ length: total }, (_, i) => `
    <button onclick="loadTasks(${i + 1})" class="${i + 1 === currentPage ? "active" : ""}">${i + 1}</button>
  `).join("");
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  const title       = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const priority    = document.getElementById("task-priority").value;
  try {
    await API.post(`/projects/${projectId}/tasks`, { title, description, priority });
    createForm.reset();
    loadTasks(1);
  } catch (ex) {
    errorMsg.textContent = ex.message;
  }
});

filterStatus.addEventListener("change",   () => loadTasks(1));
filterPriority.addEventListener("change", () => loadTasks(1));

function esc(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "/dashboard.html";
});

loadProject();
loadTasks();
