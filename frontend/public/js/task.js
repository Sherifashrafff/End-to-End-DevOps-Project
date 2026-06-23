requireLogin();

const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");
if (!taskId) window.location.href = "/dashboard.html";

const errorMsg   = document.getElementById("error-msg");
const commentList = document.getElementById("comment-list");
const commentForm = document.getElementById("comment-form");

let projectId = null;

async function loadTask() {
  try {
    const res = await API.get(`/tasks/${taskId}`);
    const t = res.data.task;
    projectId = t.project_id;
    document.getElementById("task-title").textContent   = t.title;
    document.getElementById("task-desc").textContent    = t.description || "";
    document.getElementById("task-status").textContent  = t.status.replace("_", " ");
    document.getElementById("task-priority").textContent = t.priority;
    document.getElementById("task-assignee").textContent = t.assignee_name || "Unassigned";
    document.getElementById("task-created").textContent  = t.creator_name;
    document.getElementById("back-btn").onclick = () => {
      window.location.href = `/project.html?id=${projectId}`;
    };

    // Status update
    const sel = document.getElementById("status-select");
    sel.value = t.status;
    sel.addEventListener("change", async () => {
      try {
        await API.patch(`/tasks/${taskId}`, { status: sel.value });
        document.getElementById("task-status").textContent = sel.value.replace("_", " ");
      } catch (ex) {
        errorMsg.textContent = ex.message;
      }
    });
  } catch (ex) {
    document.getElementById("task-header").innerHTML = `<p class="error">${ex.message}</p>`;
  }
}

async function loadComments(page = 1) {
  try {
    const res = await API.get(`/tasks/${taskId}/comments?page=${page}&limit=20`);
    renderComments(res.data.comments, res.pagination, page);
  } catch (ex) {
    commentList.innerHTML = `<p class="error">${ex.message}</p>`;
  }
}

function renderComments(comments, pagination, page) {
  if (!comments.length) {
    commentList.innerHTML = "<p>No comments yet.</p>";
    document.getElementById("comment-pagination").innerHTML = "";
    return;
  }

  const me = currentUser();
  commentList.innerHTML = comments.map((c) => `
    <div class="comment" data-id="${c.id}">
      <strong>${esc(c.author_name)}</strong>
      <span class="ts">${new Date(c.created_at).toLocaleString()}</span>
      <p>${esc(c.body)}</p>
      ${c.author_id === me?.id ? `<button class="del-comment" data-id="${c.id}">Delete</button>` : ""}
    </div>
  `).join("");

  commentList.querySelectorAll(".del-comment").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await API.delete(`/comments/${btn.dataset.id}`);
        loadComments(page);
      } catch (ex) {
        errorMsg.textContent = ex.message;
      }
    });
  });

  const total = pagination.pages;
  document.getElementById("comment-pagination").innerHTML = Array.from({ length: total }, (_, i) => `
    <button onclick="loadComments(${i + 1})" class="${i + 1 === page ? "active" : ""}">${i + 1}</button>
  `).join("");
}

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  const body = document.getElementById("comment-body").value.trim();
  if (!body) return;
  try {
    await API.post(`/tasks/${taskId}/comments`, { body });
    commentForm.reset();
    loadComments(1);
  } catch (ex) {
    errorMsg.textContent = ex.message;
  }
});

function esc(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

loadTask();
loadComments();
