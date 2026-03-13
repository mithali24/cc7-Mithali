import { describe, it, expect } from "vitest";
import { getFileType, getContents, getSize } from "./async3.js";

describe("File system async functions", () => {
  it("should return FILE for a file path", async () => {
    const result = await getFileType("./async1.ts");
    expect(result).toBe("FILE");
  });

  it("should return DIRECTORY for a directory", async () => {
    const result = await getFileType(".");
    expect(result).toBe("DIRECTORY");
  });

  it("should return file name for a file", async () => {
    const result = await getContents("./async1.ts");
    expect(result).toBe("async1.ts");
  });

  it("should return array for directory contents", async () => {
    const result = await getContents(".");
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return size greater than 0 for a file", async () => {
    const result = await getSize("./async1.ts");
    expect(result).toBeGreaterThan(0);
  });

  it("should throw error for invalid path", async () => {
    await expect(getFileType("invalid-path")).rejects.toThrow(
      "file system error",
    );
  });
});
