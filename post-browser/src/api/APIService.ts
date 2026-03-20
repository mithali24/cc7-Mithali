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

export class APIService {
  async fetchPosts(): Promise<Post[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  }

  async fetchComments(postId: number): Promise<Comment[]> {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }

    return res.json();
  }
}
