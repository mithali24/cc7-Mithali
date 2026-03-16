import fs from "node:fs/promises";
import path from "node:path";

/**
 * Gets the type of the file system item.
 * @param filePath - Path to the file or directory
 * @returns Promise resolving to 'FILE', 'DIRECTORY', or 'OTHER'
 */
function getFileType(
  filePath: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return fs
    .stat(filePath)
    .then((stats) => {
      if (stats.isFile()) return "FILE";
      if (stats.isDirectory()) return "DIRECTORY";
      return "OTHER";
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Gets contents of a file or directory.
 * @param filePath - Path to the file or directory
 * @returns Promise resolving to file name or array of directory items
 */
function getContents(filePath: string): Promise<string | string[]> {
  return getFileType(filePath)
    .then((type) => {
      if (type === "FILE") {
        return path.basename(filePath);
      } else if (type === "DIRECTORY") {
        return fs.readdir(filePath);
      } else {
        return "OTHER";
      }
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Calculates size of a file or directory.
 * @param filePath - Path to the file or directory
 * @returns Promise resolving to size in bytes
 */
function getSize(filePath: string): Promise<number> {
  return fs
    .stat(filePath)
    .then((stats) => {
      if (stats.isFile()) {
        return stats.size;
      } else if (stats.isDirectory()) {
        return fs.readdir(filePath).then((files) => {
          const sizePromises = files.map((file) =>
            getSize(path.join(filePath, file)),
          );
          return Promise.all(sizePromises).then((sizes) =>
            sizes.reduce((total, s) => total + s, 0),
          );
        });
      } else {
        return 0;
      }
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

const testPath = ".";

getFileType(testPath)
  .then((result) => console.log("File Type:", result))
  .catch((err) => console.error("Error:", err.message));

getContents(testPath)
  .then((result) => console.log("Contents:", result))
  .catch((err) => console.error("Error:", err.message));

getSize(testPath)
  .then((result) => console.log("Size:", result, "bytes"))
  .catch((err) => console.error("Error:", err.message));
