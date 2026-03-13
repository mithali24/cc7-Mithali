import fs from "node:fs";
import path from "node:path";

/**
 * Gets the type of a file system item.
 * @param filePath - Path to file or directory
 * @returns Promise resolving to 'FILE', 'DIRECTORY', or 'OTHER'
 */
function getFileType(
  filePath: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return fs.promises
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
 * @param filePath - Path to file or directory
 * @returns Promise resolving to filename or directory items
 */
function getContents(filePath: string): Promise<string | string[]> {
  return getFileType(filePath)
    .then((type) => {
      if (type === "FILE") {
        return path.basename(filePath);
      }
      if (type === "DIRECTORY") {
        return fs.promises.readdir(filePath);
      }
      return "OTHER";
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Gets size of a file or directory.
 * @param filePath - Path to file or directory
 * @returns Promise resolving to size in bytes
 */
function getSize(filePath: string): Promise<number> {
  return fs.promises
    .stat(filePath)
    .then((stats) => {
      if (stats.isFile()) {
        return stats.size;
      }

      if (stats.isDirectory()) {
        return fs.promises.readdir(filePath).then((files) => {
          const sizePromises = files.map((file) =>
            getSize(path.join(filePath, file)),
          );

          return Promise.all(sizePromises).then((sizes) =>
            sizes.reduce((sum, s) => sum + s, 0),
          );
        });
      }

      return 0;
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/* -------- Console Testing -------- */

const testPath = ".";

getFileType(testPath)
  .then((res) => console.log("File Type:", res))
  .catch((err) => console.error("Error:", err.message));

getContents(testPath)
  .then((res) => console.log("Contents:", res))
  .catch((err) => console.error("Error:", err.message));

getSize(testPath)
  .then((res) => console.log("Size:", res, "bytes"))
  .catch((err) => console.error("Error:", err.message));
