import type { Post } from "../api/APIService";
import { renderComments } from "./renderComments";

/**
 * Render a list of posts inside a container element.
 * Each post includes buttons to view comments and refresh the post.
 *
 * @param {Post[]} posts - Array of post objects to render.
 * @param {HTMLElement} container - The DOM element where posts will be displayed.
 */
export function renderPosts(
  posts: Post[],
  container: HTMLElement,
  onRefresh?: () => void,
) {
  container.innerHTML = "";
  const commentsContainer = document.getElementById(
    "comments-root",
  ) as HTMLElement;

  posts.forEach((post) => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <div class="post">
        <h2 class="post-title">
          <span class="post-word">POST</span> ${post.title}
        </h2>

        <p>${post.body}</p>

        <div class="post-actions">
  <button class="view-comments-btn">View Comments</button>
  <button class="refresh-btn">Refresh</button>
</div>

<!-- Add this inside the post wrapper -->
<div class="comments-container" id="comments-${post.id}"></div>
      </div>
    `;

    const viewBtn = wrapper.querySelector(
      ".view-comments-btn",
    ) as HTMLButtonElement;

    const refreshBtn = wrapper.querySelector(
      ".refresh-btn",
    ) as HTMLButtonElement;

    // Track comment toggle state
    let isOpen = false;
    let isLoaded = false;

    /**
     * Handle click on "View Comments" button:
     * - Fetch and render comments if not loaded
     * - Toggle visibility of comments
     */
    viewBtn.addEventListener("click", async () => {
      try {
        // CLOSE comments
        if (isOpen) {
          commentsContainer.innerHTML = "";
          viewBtn.textContent = "View Comments";
          isOpen = false;
          isLoaded = false;
          return;
        }

        // OPEN comments
        if (!isLoaded) {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
          );

          if (!response.ok) throw new Error("Fetch failed");

          const comments = await response.json();
          renderComments(comments, commentsContainer);
          isLoaded = true;
        }

        viewBtn.textContent = "Close Comments";
        isOpen = true;
      } catch {
        commentsContainer.innerHTML = `<p class="comments-error">error</p>`;
      }
    });

    /**
     * Handle click on "Refresh" button:
     * - Clear comments
     * - Reset button and state
     */
    refreshBtn.addEventListener("click", () => {
      if (onRefresh) {
        onRefresh();
      } else {
        commentsContainer.innerHTML = "";
        viewBtn.textContent = "View Comments";
        isOpen = false;
        isLoaded = false;
      }
    });

    container.appendChild(wrapper);
  });
}
