import type { Comment } from "../api/APIService";

export function renderComments(comments: Comment[], container: HTMLElement) {
  container.innerHTML = "";

  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
      <h4>${c.name}</h4>
      <p>${c.body}</p>
      <small>${c.email}</small>
    `;

    container.appendChild(div);
  });
}
