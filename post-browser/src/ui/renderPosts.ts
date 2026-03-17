import type { Post } from "../api/APIService";
import { renderComments } from "./renderComments";

declare global {
  interface Window {
    refreshApp?: () => void;
  }
}

export function renderPosts(posts: Post[], container: HTMLElement) {
  container.innerHTML = "";

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";

    // UPDATED: Added 'post-title' class and 'view-comments-btn' id
    div.innerHTML = `
      <h2 class="post-title"><span class="post-word">POST</span> ${post.title}</h2>
      <p>${post.body}</p>
      <div class="post-actions">
        <button class="view-comments-btn" id="view-comments-btn" data-id="${post.id}">View Comments</button>
        <button class="refresh-btn">Refresh</button>
      </div>
      <div class="comments" id="comments-${post.id}"></div>
    `;

    const viewBtn = div.querySelector(
      ".view-comments-btn",
    ) as HTMLButtonElement;
    const refreshBtn = div.querySelector(".refresh-btn") as HTMLButtonElement;
    const commentsContainer = div.querySelector(".comments") as HTMLElement;

    viewBtn.addEventListener("click", async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
        );

        // Handle non-200 responses (like the 500 error in the test)
        if (!response.ok) throw new Error("Fetch failed");

        const comments = await response.json();
        renderComments(comments, commentsContainer);
        viewBtn.style.display = "none";
      } catch (error) {
        // UPDATED: Added 'comments-error' class for the test locator
        commentsContainer.innerHTML = `<p class="comments-error">error</p>`;
        console.error("Comments fetch failed:", error);
      }
    });

    refreshBtn.addEventListener("click", () => {
      if (typeof window.refreshApp === "function") {
        window.refreshApp();
      } else {
        commentsContainer.innerHTML = "";
        viewBtn.style.display = "inline-block";
      }
    });

    container.appendChild(div);
  });
}
