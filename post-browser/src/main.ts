import "./style.css";

import { APIService } from "./api/APIService";
import type { Post } from "./api/APIService";
import { renderPosts } from "./ui/renderPosts";

const api = new APIService();

const postContainer = document.querySelector("#posts") as HTMLElement;
const prevBtn = document.querySelector("#prev") as HTMLButtonElement;
const nextBtn = document.querySelector("#next") as HTMLButtonElement;

let posts: Post[] = [];
let currentIndex = 0;

/**
 * Initialize the application:
 * - Fetch posts from API
 * - Render the first post
 * - Show error if fetch fails
 */
async function init(): Promise<void> {
  try {
    postContainer.innerHTML = "";
    posts = await api.fetchPosts();
    renderPage();
  } catch {
    postContainer.innerHTML = '<p class="error">Error loading posts</p>';
    console.error("API fetch failed - showing error text");
  }
}

/**
 * Render the current post based on currentIndex
 * Updates UI and handles edge cases
 */
function renderPage(): void {
  const post = posts[currentIndex];

  if (!post) {
    postContainer.innerHTML = '<p class="error">No post available</p>';
    return;
  }

  renderPosts([post], postContainer, () => {
    currentIndex = 0;
    renderPage();
  });
  updateButtons();
}

/**
 * Update the disabled state of previous/next buttons
 * based on currentIndex
 */
function updateButtons(): void {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === posts.length - 1;
}

/**
 * Navigate to the previous post
 */
prevBtn.onclick = (): void => {
  if (currentIndex > 0) {
    currentIndex--;
    renderPage();
  }
};

/**
 * Navigate to the next post
 */
nextBtn.onclick = (): void => {
  if (currentIndex < posts.length - 1) {
    currentIndex++;
    renderPage();
  }
};

// Start the app
init();
