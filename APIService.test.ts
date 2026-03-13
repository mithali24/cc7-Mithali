import { describe, it, expect, vi, beforeEach } from "vitest";
import { APIService, type Post, type Comment } from "./async7.js";

describe("APIService", () => {
  let service: APIService;

  beforeEach(() => {
    service = new APIService();
    vi.stubGlobal("fetch", vi.fn());
  });

  describe("fetchPost", () => {
    it("should return a post object when the API call is successful", async () => {
      const mockPost: Post = {
        userId: 1,
        id: 10,
        title: "Test Title",
        body: "Test Body",
      };

      const mockedFetch = vi.mocked(fetch);

      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => mockPost,
      } as Response);

      const result = await service.fetchPost(10);

      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/10",
      );

      expect(result).toEqual(mockPost);
    });

    it("should throw an error when the post is not found (404)", async () => {
      const mockedFetch = vi.mocked(fetch);

      mockedFetch.mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(service.fetchPost(999)).rejects.toThrow(
        "Failed to fetch post with id 999: Not Found",
      );
    });
  });

  describe("fetchComments", () => {
    it("should return exactly the number of comments requested via the count param", async () => {
      const mockComments: Comment[] = [
        { postId: 1, id: 1, name: "A", email: "a@b.com", body: "..." },
        { postId: 1, id: 2, name: "B", email: "b@b.com", body: "..." },
        { postId: 1, id: 3, name: "C", email: "c@b.com", body: "..." },
      ];

      const mockedFetch = vi.mocked(fetch);

      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => mockComments,
      } as Response);

      const result = await service.fetchComments(1, 2);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("A");
      expect(result[1].name).toBe("B");
    });
  });
});
