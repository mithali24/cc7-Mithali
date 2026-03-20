import type { Comment } from "../api/APIService";

/**
 * Render a list of comments inside a container element.
 *
 * @param {Comment[]} comments - Array of comment objects to render.
 * @param {HTMLElement} container - The DOM element where comments will be displayed.
 */
export function renderComments(comments: Comment[], container: HTMLElement) {
  container.innerHTML = `<p class="comments-title">Comments</p>`;

  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment-container";

    div.innerHTML = `
      <div class="comment-author">${c.name}</div>
      <div class="comment-body">
        <p>${c.body}</p>
        <small>${c.email}</small>
      </div>
    `;

    container.appendChild(div);
  });
}
