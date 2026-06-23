requireLogin();

const projectList = document.getElementById("project-list");
const createForm  = document.getElementById("create-project-form");
const filterSel   = document.getElementById("filter-status");
const errorMsg    = document.getElementById("error-msg");

let currentPage = 1;
const limit = 10;

async function loadProjects(page = 1) {
  const status = filterSel.value;
  const qs = `?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`;
  try {
    const res = await API.get(`/projects${qs}`);
    renderProjects(res.data.projects, res.pagination);
    currentPage = page;
  } catch (ex) {
    projectList.innerHTML = `<p class="error">${ex.message}</p>`;
  }
}

function renderProjects(projects, pagination) {
  if (!projects.length) {
    projectList.innerHTML = "<p>No projects yet. Create one above.</p>";
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  projectList.innerHTML = projects.map((p) => `
    <div class="card" onclick="window.location.href='/project.html?id=${p.id}'">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.description || "")}</p>
      <span class="badge badge-${p.status}">${p.status}</span>
      <small>Your role: ${esc(p.member_role)}</small>
    </div>
  `).join("");

  const total = pagination.pages;
  document.getElementById("pagination").innerHTML = Array.from({ length: total }, (_, i) => `
    <button onclick="loadProjects(${i + 1})" class="${i + 1 === currentPage ? "active" : ""}">${i + 1}</button>
  `).join("");
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  const name        = document.getElementById("proj-name").value.trim();
  const description = document.getElementById("proj-desc").value.trim();
  try {
    await API.post("/projects", { name, description });
    createForm.reset();
    loadProjects(1);
  } catch (ex) {
    errorMsg.textContent = ex.message;
  }
});

filterSel.addEventListener("change", () => loadProjects(1));

// Show logged-in user
const user = currentUser();
if (user) document.getElementById("user-name").textContent = user.full_name;

function esc(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

loadProjects();
