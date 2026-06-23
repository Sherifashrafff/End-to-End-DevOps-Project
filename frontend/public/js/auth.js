function isLoggedIn() {
  return !!localStorage.getItem("tf_token");
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = `/login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
  }
}

function logout() {
  localStorage.removeItem("tf_token");
  localStorage.removeItem("tf_user");
  window.location.href = "/login.html";
}

function saveSession(token, user) {
  localStorage.setItem("tf_token", token);
  localStorage.setItem("tf_user", JSON.stringify(user));
}

function currentUser() {
  try { return JSON.parse(localStorage.getItem("tf_user")); } catch { return null; }
}

// Login form handler
if (document.getElementById("login-form")) {
  if (isLoggedIn()) window.location.href = "/dashboard.html";

  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const err      = document.getElementById("error-msg");
    err.textContent = "";

    try {
      const data = await API.post("/auth/login", { email, password });
      saveSession(data.token, data.data.user);
      const params = new URLSearchParams(window.location.search);
      window.location.href = params.get("redirect") || "/dashboard.html";
    } catch (ex) {
      err.textContent = ex.message;
    }
  });
}

// Register form handler
if (document.getElementById("register-form")) {
  if (isLoggedIn()) window.location.href = "/dashboard.html";

  document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const full_name = document.getElementById("full_name").value.trim();
    const email     = document.getElementById("email").value.trim();
    const password  = document.getElementById("password").value;
    const err       = document.getElementById("error-msg");
    err.textContent = "";

    try {
      const data = await API.post("/auth/register", { full_name, email, password });
      saveSession(data.token, data.data.user);
      window.location.href = "/dashboard.html";
    } catch (ex) {
      err.textContent = ex.message;
    }
  });
}
