import "./style.css";

import { APIService } from "./api/APIService";
import type { Post, Comment } from "./api/APIService";
import { CacheService } from "./services/CacheService";
import { renderPosts } from "./ui/renderPosts";
import { renderComments } from "./ui/renderComments";

const api = new APIService();
const commentCache = new CacheService();

const postContainer = document.querySelector("#posts") as HTMLElement;
const prevBtn = document.querySelector("#prev") as HTMLButtonElement;
const nextBtn = document.querySelector("#next") as HTMLButtonElement;
const pageText = document.querySelector("#page") as HTMLElement;

let posts: Post[] = [];
let page = 1;
const PAGE_SIZE = 1;

/**
 * Extend Window type to include refreshApp
 */
interface WindowWithRefresh extends Window {
  refreshApp: () => void;
}

/**
 * Initialize App and handle errors for Playwright Test
 */
async function init() {
  try {
    postContainer.innerHTML = ""; // Clear container immediately
    posts = await api.fetchPosts();
    renderPage();
  } catch {
    postContainer.innerHTML =
      '<p class="error" style="color: red; display: block !important; visibility: visible !important;">error</p>';
    console.error("API Fetch failed - showing error text");
  }
}

/**
 * Render current page
 */
function renderPage() {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const pagePosts = posts.slice(start, end);

  renderPosts(pagePosts, postContainer);

  pageText.textContent = `Page ${page}`;
}

/**
 * Global reset function for Refresh button
 */
(window as WindowWithRefresh).refreshApp = () => {
  page = 1;
  renderPage();
};

/**
 * Previous / Next button handlers
 */
prevBtn.onclick = () => {
  if (page > 1) {
    page--;
    renderPage();
  }
};

nextBtn.onclick = () => {
  if (page * PAGE_SIZE < posts.length) {
    page++;
    renderPage();
  }
};

/**
 * Click listener for View Comments buttons
 */
postContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (
    target.tagName === "BUTTON" &&
    target.classList.contains("view-comments-btn")
  ) {
    const id = target.dataset.id!;
    let comments = commentCache.get(id) as Comment[] | undefined;

    if (!comments) {
      comments = (await api.fetchComments(Number(id))) as unknown as Comment[];
      commentCache.set(id, comments);
    }

    const container = document.querySelector(`#comments-${id}`) as HTMLElement;

    renderComments(comments, container);
  }
});

// Start the app
init();
