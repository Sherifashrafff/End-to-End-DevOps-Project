// Thin fetch wrapper. All paths are relative (/api/v1/...) — no hardcoded host.
const API = {
  _token() {
    return localStorage.getItem("tf_token");
  },

  async _request(method, path, body) {
    const headers = { "Content-Type": "application/json" };
    const token = this._token();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`/api/v1${path}`, {
      method,
      headers,
      body: body != null ? JSON.stringify(body) : undefined,
    });

    if (res.status === 204) return null;

    const data = await res.json();
    if (!res.ok) throw Object.assign(new Error(data.message || "Request failed"), { status: res.status, data });
    return data;
  },

  get(path)         { return this._request("GET",    path); },
  post(path, body)  { return this._request("POST",   path, body); },
  patch(path, body) { return this._request("PATCH",  path, body); },
  delete(path)      { return this._request("DELETE", path); },
};
