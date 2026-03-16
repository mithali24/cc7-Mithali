export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Service to handle data fetching from JSONPlaceholder API.
 */
export class APIService {
  /**
   * Fetches a single post by its ID.
   * * @param {number} id - The unique identifier of the post to fetch.
   * @returns {Promise<Post>} A promise that resolves to the Post object.
   * @throws {Error} If the network request fails or the post is not found.
   */
  async fetchPost(id: number): Promise<Post> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post with id ${id}: ${response.statusText}`,
      );
    }

    return await response.json();
  }

  /**
   * Fetches a specific number of comments for a given post.
   * * @param {number} id - The ID of the post whose comments are being fetched.
   * @param {number} count - The number of comment objects to return.
   * @returns {Promise<Comment[]>} A promise that resolves to an array of Comment objects.
   * @throws {Error} If the network request fails.
   */
  async fetchComments(id: number, count: number): Promise<Comment[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch comments for post ${id}: ${response.statusText}`,
      );
    }

    const allComments: Comment[] = await response.json();
    return allComments.slice(0, count);
  }
}
