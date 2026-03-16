import fs from "node:fs/promises";
import path from "node:path";

/**
 * Gets the type of a file system item.
 * @param filePath - Path to file or directory
 * @returns Promise resolving to 'FILE', 'DIRECTORY', or 'OTHER'
 */
export async function getFileType(
  filePath: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  try {
    const stats = await fs.stat(filePath);

    if (stats.isFile()) return "FILE";
    if (stats.isDirectory()) return "DIRECTORY";
    return "OTHER";
  } catch {
    throw new Error("file system error");
  }
}

/**
 * Gets contents of a file or directory.
 * @param filePath - Path to file or directory
 * @returns Promise resolving to filename or directory items
 */
export async function getContents(
  filePath: string,
): Promise<string | string[]> {
  try {
    const type = await getFileType(filePath);

    if (type === "FILE") {
      return path.basename(filePath);
    }

    if (type === "DIRECTORY") {
      return await fs.readdir(filePath);
    }

    return "OTHER";
  } catch {
    throw new Error("file system error");
  }
}

/**
 * Gets size of a file or directory.
 * @param filePath - Path to file or directory
 * @returns Promise resolving to size in bytes
 */
export async function getSize(filePath: string): Promise<number> {
  try {
    const type = await getFileType(filePath);

    if (type === "FILE") {
      const stats = await fs.stat(filePath);
      return stats.size;
    }

    if (type === "DIRECTORY") {
      const files = await getContents(filePath);

      let totalSize = 0;

      for (const file of files as string[]) {
        const fileFullPath = path.join(filePath, file);
        totalSize += await getSize(fileFullPath);
      }

      return totalSize;
    }

    return 0;
  } catch {
    throw new Error("file system error");
  }
}
