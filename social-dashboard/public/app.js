const API = "";
let token = localStorage.getItem("token") || "";
let page = 1;
const limit = 5;

const qs = (id) => document.getElementById(id);

function setAuthUI() {
  qs("btnLogout").classList.toggle("hidden", !token);
  qs("btnLogin").classList.toggle("hidden", !!token);
  qs("btnRegister").classList.toggle("hidden", !!token);
}

async function loadPosts() {
  const res = await fetch(`${API}/api/posts?page=${page}&limit=${limit}`);
  const data = await res.json();

  qs("pageInfo").textContent = `Page ${data.page} / ${data.totalPages || 1}`;
  qs("postList").innerHTML = "";

  data.posts.forEach((p) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.content)}</p>
      <div class="meta">by <b>${p.user?.username || "unknown"}</b> • ${new Date(p.createdAt).toLocaleString()}</div>
      <div class="actions">
        <button class="btn white small" data-edit="${p._id}">Edit</button>
        <button class="btn white small" data-del="${p._id}">Delete</button>
      </div>
    `;
    qs("postList").appendChild(div);
  });

  // wire edit/delete
  qs("postList").querySelectorAll("[data-del]").forEach((b) => {
    b.onclick = () => deletePost(b.getAttribute("data-del"));
  });
  qs("postList").querySelectorAll("[data-edit]").forEach((b) => {
    b.onclick = () => editPostPrompt(b.getAttribute("data-edit"));
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

// Register
qs("doRegister").onclick = async () => {
  qs("authMsg").textContent = "";
  const body = {
    username: qs("rUsername").value.trim(),
    email: qs("rEmail").value.trim(),
    password: qs("rPassword").value,
  };
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  qs("authMsg").textContent = data.message || JSON.stringify(data);
};

// Login
qs("doLogin").onclick = async () => {
  qs("authMsg").textContent = "";
  const body = {
    emailOrUsername: qs("lUser").value.trim(),
    password: qs("lPass").value,
  };
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.ok) {
    token = data.token;
    localStorage.setItem("token", token);
    qs("authMsg").textContent = "Logged in!";
    setAuthUI();
  } else {
    qs("authMsg").textContent = data.message || "Login failed";
  }
};

// Logout
qs("btnLogout").onclick = () => {
  token = "";
  localStorage.removeItem("token");
  setAuthUI();
};

// Create post (AUTH)
qs("createPost").onclick = async () => {
  qs("postMsg").textContent = "";
  if (!token) {
    qs("postMsg").textContent = "Login first to create a post.";
    return;
  }
  const body = {
    title: qs("pTitle").value.trim(),
    content: qs("pContent").value.trim(),
  };
  const res = await fetch(`${API}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  qs("postMsg").textContent = data.message || JSON.stringify(data);
  if (res.ok) {
    qs("pTitle").value = "";
    qs("pContent").value = "";
    await loadPosts();
  }
};

// Edit prompt
async function editPostPrompt(id) {
  if (!token) return alert("Login first.");
  const newTitle = prompt("New title (leave blank to keep same):");
  const newContent = prompt("New content (leave blank to keep same):");

  const body = {};
  if (newTitle && newTitle.trim()) body.title = newTitle.trim();
  if (newContent && newContent.trim()) body.content = newContent.trim();

  const res = await fetch(`${API}/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  alert(data.message || JSON.stringify(data));
  if (res.ok) loadPosts();
}

// Delete
async function deletePost(id) {
  if (!token) return alert("Login first.");
  if (!confirm("Delete this post?")) return;

  const res = await fetch(`${API}/api/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  alert(data.message || JSON.stringify(data));
  if (res.ok) loadPosts();
}

// Pagination buttons
qs("prev").onclick = async () => { page = Math.max(page - 1, 1); await loadPosts(); };
qs("next").onclick = async () => { page += 1; await loadPosts(); };

setAuthUI();
loadPosts();